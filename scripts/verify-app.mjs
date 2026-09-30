#!/usr/bin/env node
/**
 * scripts/verify-app.mjs
 * =============================================================================
 * 앱 단위 합격 게이트 실행기 (`pnpm verify:<short>` → 여기)
 * =============================================================================
 *
 * 왜 있는가:
 *   CI·AI 루프·사람이 “이 앱 변경이 머지 가능한가?”를 같은 명령으로 판단한다.
 *   앱 목록·성숙도는 app-gates.mjs 가 SoT.
 *
 * 사용:
 *   node scripts/verify-app.mjs portfolio
 *   node scripts/verify-app.mjs @apps/user-commerce
 *   node scripts/verify-app.mjs portfolio --snap
 *   node scripts/verify-app.mjs --list
 *   pnpm verify:portfolio / pnpm verify:commerce / …
 *
 * Env:
 *   VERIFY_WITH_SNAP=1         — --snap 과 동일 (portfolio snapRoutes)
 *   HARNESS_REQUIRE_TESTS=1    — lite 에서도 guard:tests 실행
 *   SKIP_BIOME, HARNESS_TESTS_SOFT, HARNESS_SCAN_ROOTS, HARNESS_REQUIRE_TESTS=0
 *     은 이 진입점에서 지운다. 검사를 낮추는 용도로 쓰지 않는다.
 *
 * maturity full:
 *   harness-unit → typecheck → biome(+fsd) → unit test → guard → guard:tests → e2e → build → (선택 snap)
 * maturity lite:
 *   harness-unit → typecheck → biome → (test 있으면) → guard → build
 *   e2e 스크립트가 있으면 실행(선택). guard:tests 는 HARNESS_REQUIRE_TESTS=1 일 때만
 *
 * harness-unit (`pnpm test:harness`) 은 앱과 무관하게 보호 규칙 순수 함수를 먼저 돌린다.
 * 가드 스크립트를 고친 PR 이 그 테스트를 비우면 여기서 실패한다.
 * denylist 경로 적중은 guard 프로세스를 실패시키지 않는다.
 * 시크릿 패턴만 exit 1 이다. 적중 수는 `HARNESS_DENYLIST_HITS=<n>` 로 남고,
 * AI 루프가 n > 0 이면 그 실행의 gate 를 실패로 본다.
 * 봇 PR 의 차단은 베이스 브랜치의 harness-owner-gate 다.
 *
 * 실패: 해당 단계 nonzero → fail-fast. AI 루프는 stdout 을 .ai/verify.log 로 수집.
 *
 * 문서: docs/harness/README.md · AGENTS.md
 */

import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { listGates, resolveGate } from './app-gates.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const args = process.argv.slice(2);

// --- 레지스트리 목록 (문서/디버그) ---
if (args.includes('--list')) {
  for (const g of listGates()) {
    console.info(`${g.short}\t${g.filter}\t${g.maturity}\t${g.verify}`);
  }
  process.exit(0);
}

const wantSnap = args.includes('--snap') || process.env.VERIFY_WITH_SNAP === '1';
const target = args.find((a) => !a.startsWith('-'));
if (!target) {
  console.error('Usage: node scripts/verify-app.mjs <app|short> [--snap]');
  console.error('       node scripts/verify-app.mjs --list');
  process.exit(1);
}

const gate = resolveGate(target);
if (!gate) {
  console.error(`Unknown app: ${target}. Known:`);
  for (const g of listGates()) console.error(`  - ${g.short} (${g.filter})`);
  process.exit(1);
}

const pkgPath = path.join(ROOT, gate.dir, 'package.json');
if (!fs.existsSync(pkgPath)) {
  console.error(`package.json missing: ${gate.dir}`);
  process.exit(1);
}
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
const scripts = pkg.scripts || {};

function run(label, cmd, env = {}) {
  console.info(`\n▶ [${label}] ${cmd}`);
  execSync(cmd, {
    cwd: ROOT,
    stdio: 'inherit',
    env: { ...process.env, ...env },
    shell: true,
  });
}

function hasScript(name) {
  return Boolean(scripts[name]);
}

console.info(`[verify-app] ${gate.filter} (${gate.maturity})`);

// 강제 진입점에서는 검사를 낮추는 env 를 물려받지 않는다.
delete process.env.HARNESS_TESTS_SOFT;
delete process.env.SKIP_BIOME;
delete process.env.HARNESS_SCAN_ROOTS;
if (process.env.HARNESS_REQUIRE_TESTS === '0') delete process.env.HARNESS_REQUIRE_TESTS;

// 0) 보호 규칙 단위 테스트. 앱 빌드보다 먼저 돌려, 가드 자체 회귀를 빨리 본다.
run('harness-unit', 'pnpm test:harness');

// 1) 타입
if (!hasScript('typecheck')) {
  console.error('typecheck script required');
  process.exit(1);
}
run('typecheck', `pnpm --filter ${gate.filter} run typecheck`);

// 2) Biome + FSD folder lint (루트)
run('biome', 'pnpm biome');

// 3) 단위 테스트 — full 필수, lite 는 스크립트 있을 때만
if (gate.maturity === 'full' || hasScript('test')) {
  if (hasScript('test')) {
    run('test', `pnpm --filter ${gate.filter} run test`);
  } else if (gate.maturity === 'full') {
    console.error('full maturity requires test script');
    process.exit(1);
  }
}

// 4) secret 패턴은 실패. denylist 경로 적중은 HARNESS_DENYLIST_HITS 로만 알린다.
const guardCmd = 'pnpm guard:harness';
run('guard', guardCmd);

// 4b) 새 로직 → Jest / 페이지·위젯 → E2E (또는 e2e-skip)
//     full: 필수. lite: HARNESS_REQUIRE_TESTS=1 일 때만.
if (gate.maturity === 'full' || process.env.HARNESS_REQUIRE_TESTS === '1') {
  run('guard:tests', 'pnpm guard:tests', { HARNESS_APP_DIR: gate.dir });
} else {
  console.info('[verify-app] maturity=lite — skipping guard:tests (set HARNESS_REQUIRE_TESTS=1 to enable)');
}

// 5) e2e — full 필수; lite 는 있으면 실행(조기 smoke 허용)
if (gate.maturity === 'full') {
  if (!hasScript('test:e2e')) {
    console.error('full maturity requires test:e2e');
    process.exit(1);
  }
  run('e2e', `pnpm --filter ${gate.filter} run test:e2e`);
} else if (hasScript('test:e2e')) {
  run('e2e', `pnpm --filter ${gate.filter} run test:e2e`);
}

// 6) production build
if (!hasScript('build')) {
  console.error('build script required');
  process.exit(1);
}
run('build', `pnpm --filter ${gate.filter} run build`);

// 7) 선택: L3 스크린샷 (verify 기본 게이트 아님 — --snap / VERIFY_WITH_SNAP)
if (wantSnap) {
  const routes = gate.snapRoutes || [];
  if (routes.length === 0) {
    console.info('[snap] skipped — no snapRoutes for this app');
  } else {
    for (const route of routes) {
      try {
        run('snap', `pnpm snap -- ${route}`);
      } catch {
        console.error(`[snap] failed for ${route}. Start the app (e.g. pnpm dev:portfolio) or set SNAP_BASE_URL.`);
        process.exit(1);
      }
    }
  }
}

console.info(`\n✅ [verify-app] ${gate.filter} passed`);

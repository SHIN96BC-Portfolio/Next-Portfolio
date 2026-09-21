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
 *   HARNESS_STRICT_DENYLIST=1  — guard 가 denylist hit 시 fail
 *   VERIFY_WITH_SNAP=1         — --snap 과 동일 (portfolio snapRoutes)
 *   SKIP_BIOME=1               — 루트 biome 스킵 (비권장, 디버그용)
 *
 * maturity full:
 *   typecheck → biome(+fsd) → unit test → guard → guard:tests → e2e → build → (선택 snap)
 * maturity lite:
 *   typecheck → biome → (test 있으면) → guard → build
 *   e2e 스크립트가 있으면 실행(선택). guard:tests 는 HARNESS_REQUIRE_TESTS=1 일 때만
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

// 1) 타입
if (!hasScript('typecheck')) {
  console.error('typecheck script required');
  process.exit(1);
}
run('typecheck', `pnpm --filter ${gate.filter} run typecheck`);

// 2) Biome + FSD folder lint (루트)
if (process.env.SKIP_BIOME !== '1') {
  run('biome', 'pnpm biome');
}

// 3) 단위 테스트 — full 필수, lite 는 스크립트 있을 때만
if (gate.maturity === 'full' || hasScript('test')) {
  if (hasScript('test')) {
    run('test', `pnpm --filter ${gate.filter} run test`);
  } else if (gate.maturity === 'full') {
    console.error('full maturity requires test script');
    process.exit(1);
  }
}

// 4) denylist / NEXT_PUBLIC secret 가드
const guardCmd =
  process.env.HARNESS_STRICT_DENYLIST === '1' || process.argv.includes('--strict-denylist')
    ? 'pnpm guard:harness -- --strict-denylist'
    : 'pnpm guard:harness';
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

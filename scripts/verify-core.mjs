#!/usr/bin/env node
/**
 * scripts/verify-core.mjs
 * =============================================================================
 * @core/* 합격 게이트 (`pnpm verify:core`)
 * =============================================================================
 *
 * 왜 있는가:
 *   core만 고치는 AI Task / PR 은 앱 e2e가 아니라 패키지 typecheck·테스트·build 로 판정한다.
 *   소비자 앱 verify 는 이 명령에 넣지 않는다 (전 앱 일괄 금지).
 *
 * 포함:
 *   harness-unit → build:libs → typecheck (@core/*) → biome → (test 스크립트 있는 패키지만) → guard
 *   typecheck 는 turbo ^build 레이스가 있어 dist 를 먼저 만든 뒤 pnpm --filter 로 돌린다.
 *
 * 문서: docs/harness/README.md
 */

import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

delete process.env.HARNESS_TESTS_SOFT;
delete process.env.SKIP_BIOME;
delete process.env.HARNESS_SCAN_ROOTS;
delete process.env.HARNESS_E2E_SKIP;
if (process.env.HARNESS_REQUIRE_TESTS === '0') delete process.env.HARNESS_REQUIRE_TESTS;

function run(label, cmd) {
  console.info(`\n▶ [${label}] ${cmd}`);
  execSync(cmd, {
    cwd: ROOT,
    stdio: 'inherit',
    env: process.env,
    shell: true,
  });
}

function coreDirs() {
  const dirs = [path.join(ROOT, 'core', 'bc-ui')];
  const libs = path.join(ROOT, 'core', 'libs');
  if (fs.existsSync(libs)) {
    for (const name of fs.readdirSync(libs)) {
      const dir = path.join(libs, name);
      if (fs.statSync(dir).isDirectory()) dirs.push(dir);
    }
  }
  return dirs.filter((dir) => fs.existsSync(path.join(dir, 'package.json')));
}

function packagesWithTest() {
  return coreDirs().filter((dir) => {
    const pkg = JSON.parse(fs.readFileSync(path.join(dir, 'package.json'), 'utf8'));
    return Boolean(pkg.scripts?.test);
  });
}

console.info('[verify-core] @core/* (libs)');

run('harness-unit', 'pnpm test:harness');
run('build', 'pnpm build:libs');
run('typecheck', 'pnpm --filter=@core/* run typecheck');
run('biome', 'pnpm biome');

const testers = packagesWithTest();
if (testers.length > 0) {
  run('test', 'pnpm --filter=@core/* run test');
} else {
  console.info('[verify-core] no @core/* test scripts — skipping unit');
}

run('guard', 'pnpm guard:harness');

console.info('\n✅ [verify-core] @core/* passed');

#!/usr/bin/env node
/**
 * scripts/verify-affected.mjs
 * =============================================================================
 * PR/push 에서 바뀐 경로 → `pnpm verify:<short>` 만 실행
 * =============================================================================
 *
 * 왜 있는가:
 *   ruleset 필수 체크 이름은 고정이다. 내용은 고친 앱(또는 core) 게이트여야 한다.
 *   전 앱 일괄은 하지 않는다. 해당 경로가 없으면 성공으로 끝낸다.
 *
 * 사용:
 *   pnpm verify:affected
 *   VERIFY_AFFECTED_FILES=$'apps/admin/master-admin/src/x.tsx\n' node scripts/verify-affected.mjs
 *
 * Env:
 *   HARNESS_BASE_REF — git diff 기준 (PR base SHA 또는 origin/master)
 *   VERIFY_AFFECTED_FILES — 테스트용 경로 목록 (있으면 git 을 안 본다)
 *
 * 문서: docs/harness/README.md
 */

import { execSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { APP_GATES, listGates } from './app-gates.mjs';
import { resolveHarnessBaseRef } from './harness-policy.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const ZERO_SHA = '0000000000000000000000000000000000000000';

const SHARED_EXACT = new Set(['biome.json', 'turbo.json', 'package.json', 'pnpm-lock.yaml']);
const SHARED_PREFIXES = ['scripts/', 'docs/harness/', '.github/workflows/'];

/**
 * @param {string} rel
 */
export function isHarnessSharedPath(rel) {
  const p = String(rel || '').replaceAll('\\', '/');
  if (SHARED_EXACT.has(p)) return true;
  return SHARED_PREFIXES.some((prefix) => p.startsWith(prefix));
}

/**
 * @param {string[]} paths
 * @returns {import('./app-gates.mjs').AppGate[]}
 */
export function gatesForPaths(paths) {
  const selected = new Map();
  const byDir = [...listGates()].sort((a, b) => b.dir.length - a.dir.length);

  for (const raw of paths) {
    const p = String(raw || '')
      .replaceAll('\\', '/')
      .replace(/^\.\//, '');
    if (!p) continue;

    let hit = false;
    for (const gate of byDir) {
      const dir = gate.dir.replaceAll('\\', '/');
      if (p === dir || p.startsWith(`${dir}/`)) {
        selected.set(gate.short, gate);
        hit = true;
        break;
      }
    }
    if (!hit && isHarnessSharedPath(p)) {
      selected.set('core', APP_GATES['@core/*']);
    }
  }

  const rank = (short) => {
    if (short === 'core') return 0;
    if (short === 'portfolio') return 100;
    return 50;
  };
  return [...selected.values()].sort((a, b) => rank(a.short) - rank(b.short) || a.short.localeCompare(b.short));
}

/**
 * @returns {string[]}
 */
export function listChangedPaths() {
  const injected = process.env.VERIFY_AFFECTED_FILES;
  if (injected != null) {
    return injected
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean);
  }

  const baseRaw = process.env.HARNESS_BASE_REF || process.env.GITHUB_BASE_REF || '';
  if (!baseRaw || baseRaw === ZERO_SHA) return [];

  const base = resolveHarnessBaseRef(baseRaw);
  if (!base) return [];

  const out = execSync(`git diff --name-only --diff-filter=ACMR ${base}...HEAD`, {
    cwd: ROOT,
    encoding: 'utf8',
    env: process.env,
    shell: true,
  });
  return out
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function run(label, cmd) {
  console.info(`\n▶ [${label}] ${cmd}`);
  execSync(cmd, {
    cwd: ROOT,
    stdio: 'inherit',
    env: process.env,
    shell: true,
  });
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url));

if (isMain) {
  delete process.env.HARNESS_TESTS_SOFT;
  delete process.env.SKIP_BIOME;
  delete process.env.HARNESS_SCAN_ROOTS;
  if (process.env.HARNESS_REQUIRE_TESTS === '0') delete process.env.HARNESS_REQUIRE_TESTS;

  const files = listChangedPaths();
  const gates = gatesForPaths(files);
  console.info(`[verify-affected] ${files.length} path(s) → ${gates.map((g) => g.short).join(', ') || '(none)'}`);

  if (gates.length === 0) {
    console.info('[verify-affected] no app/core/harness paths — skip');
    process.exit(0);
  }

  if (gates.some((g) => g.short === 'portfolio') && process.env.CI) {
    run('playwright', 'pnpm --filter @apps/user-portfolio exec playwright install chromium --with-deps');
  }

  for (const gate of gates) {
    run(gate.short, gate.verify);
  }

  console.info(`\n✅ [verify-affected] ${gates.map((g) => g.short).join(', ')} passed`);
}

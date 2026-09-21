#!/usr/bin/env node
/**
 * scripts/guard-tests.mjs  (`pnpm guard:tests`)
 * =============================================================================
 * 새/변경 로직에 Jest 단위 테스트·(조건부) Playwright E2E 갱신을 강제
 * =============================================================================
 *
 * 왜 있는가:
 *   verify 가 “기존 테스트 스위트 통과”만 보면, 에이전트가 새 util/mapper를
 *   테스트 없이 넣을 수 있다. diff 기준으로 대응 테스트 파일 존재를 검사한다.
 *
 * 정책 SoT: docs/harness/TESTING.md
 *
 * Env:
 *   HARNESS_BASE_REF / GITHUB_BASE_REF — PR diff 기준 (없으면 working tree vs HEAD)
 *   HARNESS_TESTS_SOFT=1               — fail 대신 경고만
 *   HARNESS_REQUIRE_TESTS=0            — 강제 비활성 (verify-app lite 기본)
 *   HARNESS_APP_DIR                    — 기본 apps/user/portfolio
 *
 * Exit 1: 단위 테스트 누락 또는 E2E 갱신 누락(스킵 사유 없음)
 */

import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const soft = process.env.HARNESS_TESTS_SOFT === '1' || process.argv.includes('--soft');
const disabled = process.env.HARNESS_REQUIRE_TESTS === '0';
const appDir = (process.env.HARNESS_APP_DIR || 'apps/user/portfolio').replaceAll('\\', '/');

/** 단위 테스트가 필요한 경로 (posix) */
const UNIT_INCLUDE = [
  /\/model\/mapper\/.+\.tsx?$/,
  /\/utils\/.+\.tsx?$/,
  /\/validations\/.+\.tsx?$/,
  /\/hooks\/.+\.tsx?$/,
  /\/use[A-Z][\w]*\.tsx?$/,
  /\/entities\/[^/]+\/model\/.+\.tsx?$/,
];

const UNIT_EXCLUDE = [
  /\.test\.tsx?$/,
  /\.spec\.tsx?$/,
  /\.d\.ts$/,
  /\/index\.tsx?$/,
  /\/types\//,
  /\/constants\//,
  /\.enum\.ts$/,
  /\/mocks?\//,
  /\/__mocks__\//,
  /\/stories\./,
];

/** E2E 갱신이 필요한 UI 셸/페이지 */
const E2E_TRIGGER = [/\/pages\/.+\.tsx$/, /\/src\/app\/.+\/page\.tsx$/, /\/widgets\/.+\.tsx$/];

function getChangedFiles() {
  const base = process.env.HARNESS_BASE_REF || process.env.GITHUB_BASE_REF;
  try {
    if (base) {
      const ref = base.startsWith('origin/') ? base : `origin/${base}`;
      try {
        execSync(`git fetch --no-tags --depth=1 origin ${base.replace(/^origin\//, '')}`, {
          cwd: ROOT,
          stdio: 'ignore',
        });
      } catch {
        // continue
      }
      const mergeBase = execSync(`git merge-base HEAD ${ref}`, { cwd: ROOT, encoding: 'utf8' }).trim();
      return execSync(`git diff --name-only --diff-filter=ACMR ${mergeBase}...HEAD`, {
        cwd: ROOT,
        encoding: 'utf8',
      })
        .split(/\r?\n/)
        .map((l) => l.trim().replaceAll('\\', '/'))
        .filter(Boolean);
    }
    // staged + unstaged vs HEAD
    const unstaged = execSync('git diff --name-only --diff-filter=ACMR HEAD', {
      cwd: ROOT,
      encoding: 'utf8',
    });
    const staged = execSync('git diff --name-only --diff-filter=ACMR --cached', {
      cwd: ROOT,
      encoding: 'utf8',
    });
    return [
      ...new Set(
        `${unstaged}\n${staged}`
          .split(/\r?\n/)
          .map((l) => l.trim().replaceAll('\\', '/'))
          .filter(Boolean)
      ),
    ];
  } catch {
    return [];
  }
}

function isUnderApp(file) {
  return file.startsWith(`${appDir}/`);
}

function needsUnit(file) {
  if (!isUnderApp(file)) return false;
  if (!/\.tsx?$/.test(file)) return false;
  if (UNIT_EXCLUDE.some((re) => re.test(file))) return false;
  return UNIT_INCLUDE.some((re) => re.test(file));
}

function needsE2eTrigger(file) {
  return isUnderApp(file) && E2E_TRIGGER.some((re) => re.test(file));
}

/** foo.ts → foo.test.ts / foo.spec.ts (같은 디렉터리) */
function candidateTestPaths(srcFile) {
  const dir = path.posix.dirname(srcFile);
  const base = path.posix.basename(srcFile).replace(/\.tsx?$/, '');
  return [`${dir}/${base}.test.ts`, `${dir}/${base}.test.tsx`, `${dir}/${base}.spec.ts`, `${dir}/${base}.spec.tsx`];
}

function fileExists(rel) {
  return fs.existsSync(path.join(ROOT, rel));
}

function hasE2eSkipReason() {
  // 커밋 메시지 + 이슈 스크래치 + 환경
  const chunks = [];
  try {
    chunks.push(execSync('git log -1 --pretty=%B', { cwd: ROOT, encoding: 'utf8' }));
  } catch {
    // ignore
  }
  for (const p of ['.ai/issue.md', '.ai/pr-body.md', 'docs/loop/STATE.md']) {
    const full = path.join(ROOT, p);
    if (fs.existsSync(full)) chunks.push(fs.readFileSync(full, 'utf8'));
  }
  if (process.env.ISSUE_BODY) chunks.push(process.env.ISSUE_BODY);
  if (process.env.HARNESS_E2E_SKIP) return true;
  return /e2e-skip\s*:/i.test(chunks.join('\n'));
}

function main() {
  if (disabled) {
    console.info('ℹ️  [guard:tests] HARNESS_REQUIRE_TESTS=0 — skipped');
    process.exit(0);
  }

  const changed = getChangedFiles();
  if (changed.length === 0) {
    console.info('ℹ️  [guard:tests] 비교할 diff 없음 — skip');
    process.exit(0);
  }

  const unitMissing = [];
  for (const file of changed) {
    if (!needsUnit(file)) continue;
    const candidates = candidateTestPaths(file);
    const ok = candidates.some((c) => fileExists(c));
    if (!ok) {
      unitMissing.push({ file, expected: candidates[0] });
    }
  }

  const e2eTriggers = changed.filter(needsE2eTrigger);
  const e2eChanged = changed.some((f) => /\/e2e\/.+\.(spec|test)\.tsx?$/.test(f));
  const e2eProblems = [];
  if (e2eTriggers.length > 0 && !e2eChanged && !hasE2eSkipReason()) {
    e2eProblems.push({
      triggers: e2eTriggers,
      hint: 'e2e/*.spec.ts 를 갱신하거나 이슈/커밋에 `e2e-skip: <사유>` 를 적으세요',
    });
  }

  let failed = false;

  if (unitMissing.length > 0) {
    failed = true;
    const lines = [
      '❌ [guard:tests] 단위 테스트(*.test.ts)가 없는 로직 파일:',
      ...unitMissing.map((u) => `   - ${u.file}  → 기대: ${u.expected}`),
      '   정책: docs/harness/TESTING.md',
    ];
    if (soft) console.info(lines.join('\n').replace('❌', '⚠️ '));
    else console.error(lines.join('\n'));
  } else {
    console.info('✅ [guard:tests] 단위 테스트 대응 OK (또는 대상 파일 없음)');
  }

  if (e2eProblems.length > 0) {
    failed = true;
    const p = e2eProblems[0];
    const lines = [
      '❌ [guard:tests] 페이지/위젯 변경에 E2E 갱신(또는 e2e-skip) 없음:',
      ...p.triggers.map((t) => `   - ${t}`),
      `   ${p.hint}`,
    ];
    if (soft) console.info(lines.join('\n').replace('❌', '⚠️ '));
    else console.error(lines.join('\n'));
  } else {
    console.info('✅ [guard:tests] E2E 규칙 OK (또는 대상 아님)');
  }

  if (failed && !soft) process.exit(1);
  if (failed && soft) {
    console.info('ℹ️  [guard:tests] HARNESS_TESTS_SOFT=1 — 경고만');
  }
  console.info('✅ [guard:tests] 통과');
}

main();

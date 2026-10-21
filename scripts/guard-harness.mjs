#!/usr/bin/env node
/**
 * scripts/guard-harness.mjs  (`pnpm guard:harness`)
 * =============================================================================
 * 하네스 안전 가드 — secret 스캔 + denylist diff
 * =============================================================================
 *
 * 왜 있는가:
 *   verify 가 “빌드/테스트 통과”만 보면, 에이전트가 auth/env/deploy 를
 *   몰래 건드리거나 NEXT_PUBLIC_*SECRET* 를 새로 심을 수 있다.
 *   이 스크립트는 그 두 축을 기계적으로 막는다 (또는 경고한다).
 *
 * 검사 1 — NEXT_PUBLIC secret 패턴
 *   apps/** 소스에서 NEXT_PUBLIC_*(SECRET|PASSWORD|PRIVATE_KEY|API_KEY)*
 *   allowlist(기존 debt) 밖이면 즉시 fail.
 *   스캔 루트: apps/<group>/<app> 전부 (HARNESS_SCAN_ROOTS 로 덮어쓰기 가능)
 *
 * 검사 2 — denylist 경로 변경
 *   docs/harness/DENYLIST.md 의 `- \`path\`` 항목과
 *   git diff (HARNESS_BASE_REF / GITHUB_BASE_REF 또는 working tree + untracked) 교집합.
 *   로컬·CI 의 이 스크립트는 목록을 알리기만 한다. 실패시키지 않는다.
 *   적중 수는 stdout 한 줄 `HARNESS_DENYLIST_HITS=<n>` 이다. AI 루프는 n > 0 이면 gate_ok=0.
 *   에이전트가 켤 수 있는 환경변수로 끄고 켜는 스위치는 두지 않는다.
 *   HARNESS_SCAN_ROOTS 는 수동 디버그용이다. pre-push, verify-app, ai-loop 는 호출 전에 지운다.
 *   봇 PR 을 막는 검사는 GitHub harness-owner-gate 다.
 *   그 검사는 베이스 브랜치의 이 목록과 CODEOWNERS 만 보고, PR 스크립트는 실행하지 않는다.
 *
 * 검사 3 — 게이트 스크립트 문자열
 *   루트 package.json 의 biome/guard/verify/loop 등과
 *   앱 package.json 의 test/test:e2e/typecheck/lint 가
 *   베이스(또는 HEAD)에 있던 값과 달라지면 그 package.json 을 denylist 적중과 같이 본다.
 *   의존성 버전만 바뀐 경우는 통과한다.
 *
 * Usage:
 *   pnpm guard:harness
 *   pnpm guard:harness:strict          # 위와 같은 명령 (별도 실패 모드 없음)
 *   node scripts/guard-harness.mjs --denylist-only
 *     secret 전수 스캔은 생략하고 경로·스크립트 값만 알린다. 그 알림은 실패가 아니다.
 *   HARNESS_BASE_REF=origin/master node scripts/guard-harness.mjs
 *   HARNESS_BASE_REF=<remote-sha>      # pre-push. SHA 는 origin/ 을 붙이지 않는다.
 *
 * 문서: docs/harness/DENYLIST.md · docs/harness/README.md · .github/workflows/harness-owner-gate.yml
 */

import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  APP_PROTECTED_SCRIPT_KEYS,
  changedProtectedScripts,
  matchDenylist,
  parseDenylistPaths,
  ROOT_PROTECTED_SCRIPT_KEYS,
  resolveHarnessBaseRef,
} from './harness-policy.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DENYLIST_PATH = path.join(ROOT, 'docs/harness/DENYLIST.md');

/** Secret scan roots — 전 앱 (+ optional env HARNESS_SCAN_ROOTS=comma paths). */
function resolveScanRoots() {
  if (process.env.HARNESS_SCAN_ROOTS) {
    return process.env.HARNESS_SCAN_ROOTS.split(',')
      .map((p) => path.resolve(ROOT, p.trim()))
      .filter((p) => fs.existsSync(p));
  }
  const appsRoot = path.join(ROOT, 'apps');
  const roots = [];
  if (!fs.existsSync(appsRoot)) return [path.join(ROOT, 'apps/user/portfolio')];
  for (const group of fs.readdirSync(appsRoot, { withFileTypes: true })) {
    if (!group.isDirectory()) continue;
    const groupDir = path.join(appsRoot, group.name);
    for (const app of fs.readdirSync(groupDir, { withFileTypes: true })) {
      if (!app.isDirectory()) continue;
      roots.push(path.join(groupDir, app.name));
    }
  }
  return roots.length ? roots : [path.join(ROOT, 'apps/user/portfolio')];
}

const SCAN_ROOTS = resolveScanRoots();

/** 기존 debt — SECURITY BACKLOG(B-002)에서 제거 예정. allowlist 밖 신규만 fail. */
const SECRET_ALLOWLIST = new Set([
  'NEXT_PUBLIC_APPLE_SECRET',
  'NEXT_PUBLIC_GOOGLE_SECRET',
  'NEXT_PUBLIC_FACEBOOK_SECRET',
  'NEXT_PUBLIC_KAKAO_SECRET',
  'NEXT_PUBLIC_NAVER_SECRET',
  'NEXT_PUBLIC_COOKIE_SECRET_KEY',
  'NEXT_PUBLIC_STORAGE_CRYPTO_SECRET_KEY',
]);

const SECRET_PATTERN = /NEXT_PUBLIC_[A-Z0-9_]*(?:SECRET|PASSWORD|PRIVATE_KEY|API_KEY)[A-Z0-9_]*/g;
const SOURCE_EXT = new Set(['.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs']);

const denylistOnly = process.argv.includes('--denylist-only');

function walkFiles(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === '.next' || entry.name === 'e2e-results') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walkFiles(full, out);
    else if (SOURCE_EXT.has(path.extname(entry.name))) out.push(full);
  }
  return out;
}

function scanSecrets() {
  const violations = [];
  for (const scanRoot of SCAN_ROOTS) {
    for (const file of walkFiles(scanRoot)) {
      const text = fs.readFileSync(file, 'utf8');
      const matches = text.match(SECRET_PATTERN) ?? [];
      for (const name of new Set(matches)) {
        if (!SECRET_ALLOWLIST.has(name)) {
          violations.push({ file: path.relative(ROOT, file).replaceAll('\\', '/'), name });
        }
      }
    }
  }
  return violations;
}

function gitShow(ref, rel) {
  try {
    return execSync(`git show ${ref}:${rel.replaceAll('\\', '/')}`, {
      cwd: ROOT,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    });
  } catch {
    return null;
  }
}

function readPackageJson(ref, rel) {
  if (ref === null) {
    const full = path.join(ROOT, rel);
    if (!fs.existsSync(full)) return null;
    return JSON.parse(fs.readFileSync(full, 'utf8'));
  }
  const raw = gitShow(ref, rel);
  if (raw == null) return null;
  return JSON.parse(raw);
}

/** 보호 스크립트 키가 base 대비 바뀐 package.json 경로 */
function scriptDriftFiles(changed, baseRef, headRef) {
  const candidates = [];
  if (changed.includes('package.json')) {
    candidates.push({ rel: 'package.json', keys: ROOT_PROTECTED_SCRIPT_KEYS });
  }
  for (const file of changed) {
    if (file !== 'package.json' && file.endsWith('/package.json')) {
      candidates.push({ rel: file, keys: APP_PROTECTED_SCRIPT_KEYS });
    }
  }
  const hits = [];
  for (const candidate of candidates) {
    try {
      const drifted = changedProtectedScripts(
        readPackageJson(baseRef, candidate.rel),
        readPackageJson(headRef, candidate.rel),
        candidate.keys
      );
      if (drifted.length > 0) hits.push(candidate.rel);
    } catch {
      hits.push(candidate.rel);
    }
  }
  return hits;
}

/** PR base…HEAD 또는 working tree vs HEAD */
function getChangedFiles() {
  const base = process.env.HARNESS_BASE_REF || process.env.GITHUB_BASE_REF;
  try {
    if (base) {
      const ref = resolveHarnessBaseRef(base);
      if (ref.startsWith('origin/')) {
        try {
          execSync(`git fetch --no-tags --depth=1 origin ${base.replace(/^origin\//, '')}`, {
            cwd: ROOT,
            stdio: 'ignore',
          });
        } catch {
          // offline 등 — merge-base / diff 로 계속
        }
      }
      const mergeBase = execSync(`git merge-base HEAD ${ref}`, { cwd: ROOT, encoding: 'utf8' }).trim();
      return execSync(`git diff --name-only ${mergeBase}...HEAD`, { cwd: ROOT, encoding: 'utf8' })
        .split(/\r?\n/)
        .map((l) => l.trim())
        .filter(Boolean);
    }
    const tracked = execSync('git diff --name-only HEAD', { cwd: ROOT, encoding: 'utf8' })
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean);
    const untracked = execSync('git ls-files --others --exclude-standard', { cwd: ROOT, encoding: 'utf8' })
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean);
    return [...tracked, ...untracked];
  } catch {
    return [];
  }
}

function compareRefs() {
  const base = process.env.HARNESS_BASE_REF || process.env.GITHUB_BASE_REF;
  if (!base) return { baseRef: 'HEAD', headRef: null, changed: getChangedFiles() };
  const ref = resolveHarnessBaseRef(base);
  if (ref.startsWith('origin/')) {
    try {
      execSync(`git fetch --no-tags --depth=1 origin ${base.replace(/^origin\//, '')}`, {
        cwd: ROOT,
        stdio: 'ignore',
      });
    } catch {
      // offline — merge-base 로 계속
    }
  }
  const mergeBase = execSync(`git merge-base HEAD ${ref}`, { cwd: ROOT, encoding: 'utf8' }).trim();
  const changed = execSync(`git diff --name-only ${mergeBase}...HEAD`, { cwd: ROOT, encoding: 'utf8' })
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
  return { baseRef: mergeBase, headRef: 'HEAD', changed };
}

function main() {
  let failed = false;

  if (!denylistOnly) {
    const secretHits = scanSecrets();
    if (secretHits.length > 0) {
      failed = true;
      console.error('❌ [guard:harness] allowlist에 없는 NEXT_PUBLIC secret 패턴이 있습니다:');
      for (const hit of secretHits) {
        console.error(`   - ${hit.name} @ ${hit.file}`);
      }
      console.error('   시크릿은 서버 env로 두고, 불가피한 debt만 docs/harness allowlist에 등록하세요.');
    } else {
      console.info(`✅ [guard:harness] NEXT_PUBLIC secret 스캔 통과 (${SCAN_ROOTS.length} app roots)`);
    }
  }

  let denylistHits = null;
  if (!fs.existsSync(DENYLIST_PATH)) {
    failed = true;
    console.error(`❌ [guard:harness] DENYLIST 없음: ${path.relative(ROOT, DENYLIST_PATH)}`);
  } else {
    const patterns = parseDenylistPaths(fs.readFileSync(DENYLIST_PATH, 'utf8'));
    let changed = [];
    let scriptHits = [];
    try {
      const compared = compareRefs();
      changed = compared.changed;
      scriptHits = scriptDriftFiles(changed, compared.baseRef, compared.headRef);
    } catch {
      changed = getChangedFiles();
    }
    const hits = [...new Set([...changed.filter((file) => matchDenylist(file, patterns)), ...scriptHits])];
    denylistHits = hits.length;

    if (hits.length > 0) {
      console.info(
        [
          'ℹ️  [guard:harness] 보호 경로가 변경 목록에 있습니다:',
          ...hits.map((file) => `   - ${file}`),
          '   이 스크립트는 그 경로 때문에 실패하지 않습니다.',
          '   봇이 연 PR 은 harness-owner-gate 가 베이스의 DENYLIST·CODEOWNERS 로 판단하고, 소유자 APPROVE 전까지 실패합니다.',
        ].join('\n')
      );
    } else if (changed.length === 0) {
      console.info('ℹ️  [guard:harness] 비교할 git diff가 없어 denylist diff 검사는 건너뜁니다.');
    } else {
      console.info('✅ [guard:harness] denylist 경로 변경 없음');
    }
  }

  if (denylistHits !== null) {
    console.info(`HARNESS_DENYLIST_HITS=${denylistHits}`);
  }

  if (failed) {
    process.exit(1);
  }
  console.info('✅ [guard:harness] 통과');
}

const isDirect = process.argv[1] && path.resolve(fileURLToPath(import.meta.url)) === path.resolve(process.argv[1]);
if (isDirect) main();

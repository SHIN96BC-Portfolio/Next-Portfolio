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
 *   git diff (HARNESS_BASE_REF / GITHUB_BASE_REF 또는 working tree) 교집합.
 *   기본: 경고만. --strict-denylist 또는 HARNESS_STRICT_DENYLIST=1 이면 fail.
 *
 * Usage:
 *   pnpm guard:harness
 *   pnpm guard:harness:strict
 *   HARNESS_BASE_REF=origin/master node scripts/guard-harness.mjs
 *
 * 문서: docs/harness/DENYLIST.md · docs/harness/README.md
 */

import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

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

const strictDenylist = process.argv.includes('--strict-denylist') || process.env.HARNESS_STRICT_DENYLIST === '1';

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

/** DENYLIST.md 불릿에서 path / glob 추출 */
function parseDenylistPaths(md) {
  const paths = [];
  for (const line of md.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed.startsWith('-')) continue;
    const tick = trimmed.match(/`([^`]+)`/);
    if (tick?.[1] && !tick[1].includes('*') && !tick[1].startsWith('#')) {
      paths.push(tick[1].replaceAll('\\', '/'));
    }
    const globLine = trimmed.match(/^- `?([^*\s`][^`]*\*[^`]*)`?/);
    if (globLine?.[1]) {
      paths.push(globLine[1].replaceAll('\\', '/'));
    }
  }
  return paths;
}

function matchDenylist(changedFile, patterns) {
  const normalized = changedFile.replaceAll('\\', '/');
  return patterns.some((pattern) => {
    if (pattern.includes('*')) {
      const re = new RegExp(
        `^${pattern
          .replace(/[.+^${}()|[\]\\]/g, '\\$&')
          .replace(/\*\*/g, '.*')
          .replace(/\*/g, '[^/]*')}$`
      );
      return re.test(normalized);
    }
    return normalized === pattern || normalized.startsWith(`${pattern}/`);
  });
}

/** PR base…HEAD 또는 working tree vs HEAD */
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
        // offline 등 — merge-base / diff 로 계속
      }
      const mergeBase = execSync(`git merge-base HEAD ${ref}`, { cwd: ROOT, encoding: 'utf8' }).trim();
      return execSync(`git diff --name-only ${mergeBase}...HEAD`, { cwd: ROOT, encoding: 'utf8' })
        .split(/\r?\n/)
        .map((l) => l.trim())
        .filter(Boolean);
    }
    return execSync('git diff --name-only HEAD', { cwd: ROOT, encoding: 'utf8' })
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter(Boolean);
  } catch {
    return [];
  }
}

function main() {
  let failed = false;

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

  if (!fs.existsSync(DENYLIST_PATH)) {
    failed = true;
    console.error(`❌ [guard:harness] DENYLIST 없음: ${path.relative(ROOT, DENYLIST_PATH)}`);
  } else {
    const patterns = parseDenylistPaths(fs.readFileSync(DENYLIST_PATH, 'utf8'));
    const changed = getChangedFiles();
    const hits = changed.filter((f) => matchDenylist(f, patterns));

    if (hits.length > 0) {
      const msg = [
        '⚠️  [guard:harness] denylist(human gate) 경로가 변경 목록에 있습니다:',
        ...hits.map((f) => `   - ${f}`),
        '   사람 승인 없이 머지하지 마세요. (--strict-denylist 또는 HARNESS_STRICT_DENYLIST=1 이면 fail)',
      ].join('\n');
      if (strictDenylist) {
        failed = true;
        console.error(msg.replace('⚠️  ', '❌ '));
      } else {
        console.info(msg);
      }
    } else if (changed.length === 0) {
      console.info('ℹ️  [guard:harness] 비교할 git diff가 없어 denylist diff 검사는 건너뜁니다.');
    } else {
      console.info('✅ [guard:harness] denylist 경로 변경 없음');
    }
  }

  if (failed) {
    process.exit(1);
  }
  console.info('✅ [guard:harness] 통과');
}

main();

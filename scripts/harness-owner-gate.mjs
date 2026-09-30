/**
 * scripts/harness-owner-gate.mjs
 * =============================================================================
 * PR 보호 경로가 바뀌면 코드 소유자의 APPROVE 가 있을 때만 통과
 * =============================================================================
 *
 * GitHub Actions `pull_request_target` 에서만 실행한다.
 * 체크아웃은 베이스 ref 이고, PR 브랜치의 스크립트는 실행하지 않는다.
 * 그래서 PR 이 가드·워크플로·CODEOWNERS 를 느슨하게 고쳐도 이 판정은 베이스 규칙이다.
 *
 * 환경변수 (워크플로가 넣는다. PR 브랜치 내용은 믿지 않는다):
 *   GITHUB_TOKEN / GH_TOKEN     읽기 전용 토큰. PR 코드를 실행하는 데 쓰지 않는다.
 *   GITHUB_REPOSITORY           owner/repo
 *   PR_NUMBER
 *   BASE_SHA / HEAD_SHA         베이스 규칙과 PR 쪽 package.json 을 비교할 ref
 *   PR_AUTHOR                   PR 을 연 GitHub 로그인. 소유자 본인이면 그 파일은 통과.
 *                               봇 계정이면 CODEOWNERS 소유자의 APPROVE 가 필요하다.
 *
 * 로컬 환경변수로 이 검사를 통과시키는 스위치는 없다.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  APP_PROTECTED_SCRIPT_KEYS,
  changedProtectedScripts,
  filesMissingOwnerApproval,
  matchDenylist,
  parseCodeowners,
  parseDenylistPaths,
  ROOT_PROTECTED_SCRIPT_KEYS,
} from './harness-policy.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

/** GitHub REST 공통 헤더. raw 파일 본문이 필요할 때만 Accept 를 덮어쓴다. */
function headers(token) {
  return {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'User-Agent': 'harness-owner-gate',
  };
}

async function githubJson(token, url) {
  const res = await fetch(url, { headers: headers(token) });
  if (!res.ok) {
    throw new Error(`GitHub ${res.status} ${url}`);
  }
  return res.json();
}

/** 목록 API 를 100건씩 최대 20페이지까지 이어 붙인다. PR 파일·리뷰가 대상이다. */
async function githubPages(token, repo, apiPath) {
  const out = [];
  for (let page = 1; page <= 20; page++) {
    const joiner = apiPath.includes('?') ? '&' : '?';
    const url = `https://api.github.com/repos/${repo}/${apiPath}${joiner}per_page=100&page=${page}`;
    const data = await githubJson(token, url);
    if (!Array.isArray(data) || data.length === 0) break;
    out.push(...data);
    if (data.length < 100) break;
  }
  return out;
}

/**
 * 특정 ref 의 JSON 파일 본문.
 * PR 워크플로 체크아웃이 아니라 Contents API 라서, PR 브랜치의 스크립트는 실행되지 않는다.
 * 파일이 그 ref 에 없으면 null.
 */
async function readRepoJson(token, repo, file, ref) {
  const encoded = file
    .split('/')
    .map((part) => encodeURIComponent(part))
    .join('/');
  const url = `https://api.github.com/repos/${repo}/contents/${encoded}?ref=${encodeURIComponent(ref)}`;
  const res = await fetch(url, {
    headers: { ...headers(token), Accept: 'application/vnd.github.raw' },
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`contents ${file} ${res.status}`);
  return JSON.parse(await res.text());
}

/**
 * 사용자별 마지막 리뷰만 본다.
 * APPROVE 뒤에 CHANGES_REQUESTED 가 오면 그 사용자는 승인으로 치지 않는다.
 */
function latestApprovedLogins(reviews) {
  const stateByUser = new Map();
  for (const review of reviews) {
    const login = review.user?.login;
    if (!login || !review.state) continue;
    stateByUser.set(login, review.state);
  }
  return [...stateByUser.entries()].filter(([, state]) => state === 'APPROVED').map(([login]) => login);
}

/**
 * 변경된 package.json 가운데, 베이스에 있던 게이트 스크립트 문자열이 달라진 경로.
 * 루트는 verify/guard/biome/loop 키, 앱 package.json 은 test/test:e2e/typecheck/lint 만 본다.
 */
async function scriptDriftFiles(token, repo, changed, baseSha, headSha) {
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
    const basePkg = await readRepoJson(token, repo, candidate.rel, baseSha);
    const headPkg = await readRepoJson(token, repo, candidate.rel, headSha);
    if (changedProtectedScripts(basePkg, headPkg, candidate.keys).length > 0) hits.push(candidate.rel);
  }
  return hits;
}

/**
 * 보호 파일 판정.
 * 경로 denylist 적중과 게이트 스크립트 값 변경을 합친 뒤,
 * 작성자가 소유자가 아니고 소유자 APPROVE 도 없으면 missing 에 남긴다.
 * denylist 본문과 CODEOWNERS 는 호출부가 베이스 브랜치에서 읽은 문자열이어야 한다.
 */
export async function evaluateOwnerGate({
  token,
  repo,
  prNumber,
  baseSha,
  headSha,
  denylistMd,
  codeownersText,
  authorLogin = '',
}) {
  const patterns = parseDenylistPaths(denylistMd);
  const rules = parseCodeowners(codeownersText);
  const files = await githubPages(token, repo, `pulls/${prNumber}/files`);
  const changed = files.map((file) => file.filename).filter(Boolean);
  const pathHits = changed.filter((file) => matchDenylist(file, patterns));
  const scriptHits = await scriptDriftFiles(token, repo, changed, baseSha, headSha);
  const hits = [...new Set([...pathHits, ...scriptHits])];
  if (hits.length === 0) {
    return { ok: true, hits, missing: [] };
  }
  const reviews = await githubPages(token, repo, `pulls/${prNumber}/reviews`);
  const missing = filesMissingOwnerApproval(hits, rules, latestApprovedLogins(reviews), authorLogin);
  return { ok: missing.length === 0, hits, missing };
}

async function main() {
  const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN || '';
  const repo = process.env.GITHUB_REPOSITORY || '';
  const prNumber = process.env.PR_NUMBER || '';
  const baseSha = process.env.BASE_SHA || '';
  const headSha = process.env.HEAD_SHA || '';
  if (!token || !repo || !prNumber || !baseSha || !headSha) {
    console.error('harness-owner-gate: GITHUB_TOKEN, GITHUB_REPOSITORY, PR_NUMBER, BASE_SHA, HEAD_SHA 가 필요합니다.');
    process.exit(1);
  }

  const denylistPath = path.join(ROOT, 'docs/harness/DENYLIST.md');
  const codeownersPath = path.join(ROOT, '.github/CODEOWNERS');
  if (!fs.existsSync(denylistPath) || !fs.existsSync(codeownersPath)) {
    console.error('베이스 체크아웃에 DENYLIST.md 또는 CODEOWNERS 가 없습니다.');
    process.exit(1);
  }

  const result = await evaluateOwnerGate({
    token,
    repo,
    prNumber,
    baseSha,
    headSha,
    denylistMd: fs.readFileSync(denylistPath, 'utf8'),
    codeownersText: fs.readFileSync(codeownersPath, 'utf8'),
    authorLogin: process.env.PR_AUTHOR || '',
  });

  if (result.ok) {
    console.info(
      result.hits.length === 0
        ? '✅ [harness-owner-gate] 보호 경로 변경 없음'
        : `✅ [harness-owner-gate] 보호 경로 ${result.hits.length}건 — 코드 소유자 APPROVE 확인`
    );
    return;
  }

  console.error('❌ [harness-owner-gate] 보호 파일은 코드 소유자 APPROVE 없이 머지할 수 없습니다.');
  for (const file of result.missing) console.error(`   - ${file}`);
  console.error('   봇 계정이 연 PR 은 코드 소유자가 APPROVE 해야 통과합니다.');
  process.exit(1);
}

const isDirect = process.argv[1] && path.resolve(fileURLToPath(import.meta.url)) === path.resolve(process.argv[1]);
if (isDirect) {
  main().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}

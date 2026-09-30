/**
 * scripts/harness-policy.mjs
 * =============================================================================
 * 보호 경로 규칙의 순수 함수 (파일 I/O · GitHub API 없음)
 * =============================================================================
 *
 * 왜 있는가:
 *   로컬 가드(guard-harness)와 GitHub owner gate(harness-owner-gate)가
 *   denylist 문장, package.json 스크립트 키, CODEOWNERS 소유자를
 *   서로 다른 방식으로 해석하면 한쪽만 우회된다.
 *   판정 규칙을 이 파일 한곳에 둔다.
 *
 * 누가 실행하나:
 *   - 로컬·CI의 guard-harness 는 작업 트리의 이 파일을 import 한다.
 *     그래서 같은 PR에서 이 파일을 느슨하게 고치면 로컬 가드도 같이 느슨해진다.
 *   - harness-owner-gate 워크플로는 pull_request_target 이라
 *     default 브랜치에 이미 머지된 이 파일을 실행한다.
 *     PR 안의 복사본은 그 검사에 쓰이지 않는다.
 *
 * 테스트: scripts/harness-policy.test.mjs (`pnpm test:harness`)
 */

/**
 * 루트 package.json 에서 “값이 바뀌면” human gate 인 스크립트 이름.
 * 의존성 버전만 바꾸는 커밋은 여기 키의 문자열이 그대로면 걸리지 않는다.
 * 베이스에 아직 없는 키를 새로 추가하는 것도 변경으로 보지 않는다.
 * (게이트 명령을 exit 0 으로 바꾸는 우회만 막는다.)
 */
export const ROOT_PROTECTED_SCRIPT_KEYS = [
  'lint',
  'lint:fix',
  'typecheck',
  'check-types',
  'test',
  'test:harness',
  'biome',
  'lint:fsd',
  'lint:fsd:dry',
  'guard:harness',
  'guard:harness:strict',
  'guard:tests',
  'guard:tests:soft',
  'verify:app',
  'verify:portfolio',
  'verify:portfolio:snap',
  'verify:commerce',
  'verify:fashion',
  'verify:social',
  'verify:master-admin',
  'verify:commerce-admin',
  'verify:fashion-admin',
  'verify:social-admin',
  'loop:status',
  'loop:lock',
  'loop:unlock',
  'loop:budget',
  'loop:parse-issue',
];

/**
 * 앱 package.json 의 게이트 스크립트.
 * `test` 를 `exit 0` 으로 바꾸면 Jest 가 돌지 않으므로, 경로 denylist 와 별도로 값을 비교한다.
 */
export const APP_PROTECTED_SCRIPT_KEYS = ['test', 'test:e2e', 'typecheck', 'lint'];

/**
 * HARNESS_BASE_REF 를 git 이 아는 ref 로 바꾼다.
 * `origin/master` 는 그대로 둔다.
 * `master` 처럼 브랜치 이름만 오면 `origin/master` 로 붙여, CI 가 로컬 브랜치와 헷갈리지 않게 한다.
 * 7~40자리 hex 는 pre-push 가 넘기는 커밋 SHA 다. `origin/<sha>` 로 바꾸면 merge-base 가 실패한다.
 */
export function resolveHarnessBaseRef(base) {
  const name = String(base || '').trim();
  if (!name) return null;
  if (name.startsWith('origin/')) return name;
  if (/^[0-9a-f]{7,40}$/i.test(name)) return name;
  return `origin/${name.replace(/^origin\//, '')}`;
}

/**
 * DENYLIST.md 에서 줄 전체가 `- \`path\`` 인 항목만 뽑는다.
 * 글로브(`*`, `**`)도 그대로 둔다.
 * 백틱이 설명 문장 안에 있는 줄은 경로가 아니므로 무시한다.
 */
export function parseDenylistPaths(md) {
  const paths = [];
  for (const line of md.split(/\r?\n/)) {
    const match = line.trim().match(/^-\s+`([^`]+)`\s*$/);
    if (!match?.[1]) continue;
    const value = match[1].replaceAll('\\', '/').trim();
    if (!value || value.startsWith('#')) continue;
    paths.push(value);
  }
  return paths;
}

/**
 * denylist·CODEOWNERS 글로브를 전체 경로 정규식으로 만든다.
 * `**` 를 먼저 `.*` 로 바꾸면 뒤의 `*` 치환이 그 별을 다시 건드려
 * 디렉터리를 넘지 못하게 된다. 자리표시자로 순서를 고정한다.
 * `*` 는 슬래시를 넘지 않고, `**` 는 넘는다.
 */
function globToRegExp(pattern) {
  const escaped = pattern
    .replace(/[.+^${}()|[\]\\]/g, '\\$&')
    .replace(/\*\*/g, '<<GLOBSTAR>>')
    .replace(/\*/g, '[^/]*')
    .replace(/<<GLOBSTAR>>/g, '.*');
  return new RegExp(`^${escaped}$`);
}

/**
 * 변경 파일 하나가 denylist 패턴에 걸리는지.
 * 글로브가 없으면 경로 그 자체이거나, 그 경로 아래 파일이면 일치한다.
 * `docs/harness` 는 `docs/harness/DENYLIST.md` 에 맞지만 `docs/harness-notes.md` 에는 맞지 않는다.
 */
export function matchDenylist(changedFile, patterns) {
  const normalized = changedFile.replaceAll('\\', '/');
  return patterns.some((pattern) => {
    if (pattern.includes('*')) return globToRegExp(pattern).test(normalized);
    return normalized === pattern || normalized.startsWith(`${pattern}/`);
  });
}

/**
 * 베이스 package.json 에 이미 있던 보호 키의 문자열이 head 에서 달라진 키 이름.
 * 키 삭제(head 에 없음)도 변경이다. 베이스에 없던 키를 새로 넣는 것은 무시한다.
 */
export function changedProtectedScripts(basePkg, headPkg, keys) {
  const base = basePkg?.scripts ?? {};
  const head = headPkg?.scripts ?? {};
  const changed = [];
  for (const key of keys) {
    if (!Object.prototype.hasOwnProperty.call(base, key)) continue;
    if (base[key] !== head[key]) changed.push(key);
  }
  return changed;
}

/**
 * CODEOWNERS 본문을 순서대로 규칙 배열로 만든다.
 * `#` 주석은 버린다. `@login` 만 소유자로 보고 소문자로 정규화한다.
 * GitHub 와 같이 마지막에 매칭된 규칙이 그 파일의 소유자다.
 */
export function parseCodeowners(text) {
  const rules = [];
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const parts = trimmed.split(/\s+/);
    const pattern = parts[0];
    const owners = parts
      .slice(1)
      .filter((part) => part.startsWith('@'))
      .map((part) => part.slice(1).toLowerCase());
    rules.push({ pattern, owners });
  }
  return rules;
}

function codeownersMatch(pattern, file) {
  let body = pattern.replaceAll('\\', '/');
  if (body.startsWith('/')) body = body.slice(1);
  if (body.endsWith('/')) {
    const dir = body.slice(0, -1);
    return file === dir || file.startsWith(`${dir}/`);
  }
  if (body.includes('*')) return globToRegExp(body).test(file);
  return file === body;
}

/**
 * 파일 하나의 최종 소유자 로그인(소문자, @ 없음).
 * 어떤 규칙에도 안 걸리면 빈 배열이다. 호출부는 그것을 “승인으로 통과 불가”로 본다.
 */
export function ownersFor(file, rules) {
  const normalized = file.replaceAll('\\', '/');
  let owners = [];
  for (const rule of rules) {
    if (codeownersMatch(rule.pattern, normalized)) owners = rule.owners;
  }
  return owners;
}

/**
 * 코드 소유자 승인이 아직 없는 보호 파일.
 * 통과 조건은 둘 중 하나다.
 *   1) 그 파일의 CODEOWNERS 소유자가 APPROVE 리뷰를 남겼다.
 *   2) PR 작성자 로그인이 그 파일의 소유자다. (사람이 자기 계정으로 연 PR)
 * 소유자 규칙이 없는 파일은 항상 남긴다. 작성자가 소유자가 아니면 봇 PR 은 1)이 필요하다.
 * AI 봇 토큰이 소유자 계정이면 2)가 봇에게도 열리므로, 봇은 다른 GitHub 계정이어야 한다.
 */
export function filesMissingOwnerApproval(files, rules, approvedLogins, authorLogin = '') {
  const approved = new Set(approvedLogins.map((login) => login.toLowerCase()));
  const author = authorLogin.toLowerCase();
  return files.filter((file) => {
    const owners = ownersFor(file, rules);
    if (owners.length === 0) return true;
    if (author && owners.includes(author)) return false;
    return !owners.some((owner) => approved.has(owner));
  });
}

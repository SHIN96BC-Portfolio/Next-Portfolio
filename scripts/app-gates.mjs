/**
 * scripts/app-gates.mjs
 * =============================================================================
 * 모노레포 앱 → 합격 게이트 레지스트리 (단일 SoT)
 * =============================================================================
 *
 * 왜 있는가:
 *   “어떤 앱을 고치면 어떤 `pnpm verify:<short>` 를 돌리는가”를
 *   이슈 파서(ai-loop-parse-issue) · verify-app · 문서가 같이 본다.
 *
 * 필드 (AppGate):
 *   short       — package.json 스크립트 접미사 (verify:portfolio → portfolio)
 *   filter      — pnpm --filter 패키지명
 *   verify      — 루트에서 돌리는 전체 게이트 명령 문자열
 *   dir         — 앱 루트 상대 경로 (package.json 존재 확인용)
 *   maturity    — 'full' | 'lite'
 *     full: typecheck + biome + test + guard + guard:tests + e2e + build
 *     lite: typecheck + biome + guard + build (+ test 스크립트 있으면)
 *           ※ lite ≠ 앱 없음. e2e 성숙도 단계다.
 *   snapRoutes  — (선택) verify --snap 시 촬영 경로
 *
 * 별칭:
 *   APP_ALIASES — short / user-portfolio / admin-* → filter
 *   resolveGate — 이슈 본문·CLI 인자를 AppGate 로 정규화
 *
 * 새 앱 추가 절차:
 *   1) 여기 APP_GATES + APP_ALIASES
 *   2) package.json 에 verify:<short>
 *   3) docs/harness/README.md 표 · DENYLIST 앱 절
 *
 * 문서: docs/harness/README.md · docs/loop/ROADMAP.md
 */

/** @typedef {{ short: string, filter: string, verify: string, dir: string, maturity: 'full' | 'lite', snapRoutes?: string[] }} AppGate */

/** @type {Record<string, AppGate>} */
export const APP_GATES = {
  '@apps/user-portfolio': {
    short: 'portfolio',
    filter: '@apps/user-portfolio',
    verify: 'pnpm verify:portfolio',
    dir: 'apps/user/portfolio',
    maturity: 'full',
    snapRoutes: ['/ko'],
  },
  '@apps/user-commerce': {
    short: 'commerce',
    filter: '@apps/user-commerce',
    verify: 'pnpm verify:commerce',
    dir: 'apps/user/commerce',
    maturity: 'lite',
  },
  '@apps/user-fashion': {
    short: 'fashion',
    filter: '@apps/user-fashion',
    verify: 'pnpm verify:fashion',
    dir: 'apps/user/fashion',
    maturity: 'lite',
  },
  '@apps/user-social': {
    short: 'social',
    filter: '@apps/user-social',
    verify: 'pnpm verify:social',
    dir: 'apps/user/social',
    maturity: 'lite',
  },
  '@apps/admin-master-admin': {
    short: 'master-admin',
    filter: '@apps/admin-master-admin',
    verify: 'pnpm verify:master-admin',
    dir: 'apps/admin/master-admin',
    maturity: 'lite',
  },
  '@apps/admin-commerce-admin': {
    short: 'commerce-admin',
    filter: '@apps/admin-commerce-admin',
    verify: 'pnpm verify:commerce-admin',
    dir: 'apps/admin/commerce-admin',
    maturity: 'lite',
  },
  '@apps/admin-fashion-admin': {
    short: 'fashion-admin',
    filter: '@apps/admin-fashion-admin',
    verify: 'pnpm verify:fashion-admin',
    dir: 'apps/admin/fashion-admin',
    maturity: 'lite',
  },
  '@apps/admin-social-admin': {
    short: 'social-admin',
    filter: '@apps/admin-social-admin',
    verify: 'pnpm verify:social-admin',
    dir: 'apps/admin/social-admin',
    maturity: 'lite',
  },
};

/** short name / alias → filter 키 */
export const APP_ALIASES = {
  portfolio: '@apps/user-portfolio',
  'user-portfolio': '@apps/user-portfolio',
  commerce: '@apps/user-commerce',
  'user-commerce': '@apps/user-commerce',
  fashion: '@apps/user-fashion',
  'user-fashion': '@apps/user-fashion',
  social: '@apps/user-social',
  'user-social': '@apps/user-social',
  'master-admin': '@apps/admin-master-admin',
  'admin-master-admin': '@apps/admin-master-admin',
  'commerce-admin': '@apps/admin-commerce-admin',
  'admin-commerce-admin': '@apps/admin-commerce-admin',
  'fashion-admin': '@apps/admin-fashion-admin',
  'admin-fashion-admin': '@apps/admin-fashion-admin',
  'social-admin': '@apps/admin-social-admin',
  'admin-social-admin': '@apps/admin-social-admin',
};

/**
 * 이슈/CLI 문자열 → AppGate
 * 허용 예: portfolio | @apps/user-portfolio | pnpm verify:commerce | verify:fashion
 *
 * @param {string} raw
 * @returns {AppGate | null}
 */
export function resolveGate(raw) {
  const s = String(raw || '')
    .trim()
    .replace(/^["']|["']$/g, '');
  if (!s) return null;

  if (APP_GATES[s]) return APP_GATES[s];

  const alias = APP_ALIASES[s] || APP_ALIASES[s.replace(/^@apps\//, '')];
  if (alias && APP_GATES[alias]) return APP_GATES[alias];

  if (s.startsWith('@apps/') && APP_GATES[s]) return APP_GATES[s];

  // verify:portfolio → portfolio
  const fromVerify = s.match(/^(?:pnpm\s+)?verify:([\w-]+)$/i);
  if (fromVerify) {
    const a = APP_ALIASES[fromVerify[1]];
    if (a) return APP_GATES[a];
  }

  return null;
}

/** verify-app --list / 문서 덤프용 */
export function listGates() {
  return Object.values(APP_GATES);
}

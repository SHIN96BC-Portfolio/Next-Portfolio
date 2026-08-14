/** CMS 페이지 키 — API·mock·라우트의 `pageKey`와 매칭 */
export const PAGE_KEY = {
  /** 홈 랜딩 */
  HOME: 'HOME',
  /** 소개(About) — 섹션 단위로도 사용 */
  ABOUT: 'ABOUT',
  /** 경력·이력서 */
  CAREER: 'CAREER',
  /** 프로젝트 목록 */
  PROJECTS: 'PROJECTS',
} as const;

export type PageKey = (typeof PAGE_KEY)[keyof typeof PAGE_KEY];

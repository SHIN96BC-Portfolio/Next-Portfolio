/** 홈 섹션 렌더링 타입 — 위젯 매핑에 사용 */
export const SECTION_TYPE = {
  /** Hero 배너 */
  HERO: 'HERO',
  /** 마크다운 본문 섹션 */
  MARKDOWN: 'MARKDOWN',
  /** 프로젝트 그리드 */
  PROJECT_GRID: 'PROJECT_GRID',
  /** 경력 타임라인 */
  TIMELINE: 'TIMELINE',
  /** 커스텀 위젯(Skills, Contact 등) */
  CUSTOM: 'CUSTOM',
  /** 경력기술서 프로젝트 문서 */
  RESUME_PROJECT: 'RESUME_PROJECT',
} as const;

export type SectionType = (typeof SECTION_TYPE)[keyof typeof SECTION_TYPE];

/** CMS 페이지 키 — API·mock 데이터의 `pageKey` 필드와 매칭 */
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

/** CMS 콘텐츠 발행 상태 — `published`(공개) / `draft`(임시) */
export type ContentMode = 'published' | 'draft';

/**
 * CMS·mock API 콘텐츠 언어 코드.
 * URL locale(`/[lang]/...`)과 동일한 문자열 값을 사용합니다.
 */
export const CONTENT_LANG = {
  /** 한국어 */
  KO: 'ko',
  /** 영어 */
  EN: 'en',
  /** 일본어 */
  JA: 'ja',
} as const;

/** `CONTENT_LANG` 값의 유니온 타입 */
export type ContentLang = (typeof CONTENT_LANG)[keyof typeof CONTENT_LANG];

/** API·mock 요청 시 lang을 지정하지 않았을 때의 기본 콘텐츠 언어 */
export const DEFAULT_CONTENT_LANG: ContentLang = CONTENT_LANG.KO;

/** `resolveContentLang` 검사에 쓰는 허용 콘텐츠 언어 목록 */
export const SUPPORTED_CONTENT_LANGS: ContentLang[] = [CONTENT_LANG.KO, CONTENT_LANG.EN, CONTENT_LANG.JA];

/**
 * API·SSR에서 받은 lang 문자열을 `ContentLang`으로 정규화.
 * 지원하지 않는 값이면 `DEFAULT_CONTENT_LANG`을 반환합니다.
 */
export function resolveContentLang(lang?: string | null): ContentLang {
  if (isContentLang(lang)) {
    return lang;
  }

  return DEFAULT_CONTENT_LANG;
}

function isContentLang(lang?: string | null): lang is ContentLang {
  return SUPPORTED_CONTENT_LANGS.includes(lang as ContentLang);
}

export interface HomeSectionRes {
  id: string;
  pageKey: PageKey;
  sectionKey: string;
  sectionType: SectionType;
  title: string | null;
  config: SectionConfig;
  configSchemaVersion: number;
  displayOrder: number;
  isActive: boolean;
}

export type SectionConfig =
  | HeroConfig
  | MarkdownConfig
  | ProjectGridConfig
  | TimelineConfig
  | ResumeProjectConfig
  | SkillsConfig
  | LicensesConfig
  | EducationConfig
  | ContactConfig;

export interface HeroConfig {
  name: string;
  title: string;
  tagline: string;
  links: HeroLink[];
}

export interface HeroLink {
  type: 'github' | 'portfolio' | 'email';
  label: string;
  url: string;
}

export interface MarkdownConfig {
  body: string;
}

export interface ProjectGridConfig {
  companies: ProjectCompany[];
}

export interface ProjectCompany {
  id: string;
  name: string;
  period: string;
  role?: string;
  projects: ProjectItem[];
}

export interface ProjectLink {
  label: string;
  url: string;
}

export interface ProjectLinkGroup {
  title: string;
  links: ProjectLink[];
}

export interface ProjectItem {
  id: string;
  name: string;
  period: string;
  role: string;
  summary: string;
  highlights: string[];
  issues?: string[];
  techStack: string[];
  links?: ProjectLink[];
  linkGroups?: ProjectLinkGroup[];
}

export interface TimelineConfig {
  items: TimelineItem[];
}

export interface TimelineItem {
  id: string;
  company: string;
  period: string;
  location: string;
  department: string;
  position: string;
  role: string;
  description: string;
  isDevRole?: boolean;
}

export interface ResumeWorkSection {
  title: string;
  items: string[];
}

export interface ResumeExtraSection {
  title: string;
  body?: string;
  items?: string[];
}

export interface ResumeProjectConfig {
  projectId: string;
  orderLabel?: string;
  title: string;
  company: string;
  period: string;
  role: string;
  links: ProjectLink[];
  problem: string;
  workSections: ResumeWorkSection[];
  outcomes: string[];
  extraSections?: ResumeExtraSection[];
  techStack: string[];
}

export interface SkillsConfig {
  groups: SkillGroup[];
}

export interface SkillGroup {
  title: string;
  items: string[];
}

export interface LicensesConfig {
  items: LicenseItem[];
}

export interface LicenseItem {
  name: string;
  date: string;
}

export interface EducationConfig {
  items: EducationItem[];
}

export interface EducationItem {
  school: string;
  period: string;
  location: string;
  details: string[];
}

export interface ContactConfig {
  email: string;
  links: HeroLink[];
  message?: string;
}

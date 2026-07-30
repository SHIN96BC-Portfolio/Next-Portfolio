export const PAGE_KEY = {
  HOME: 'HOME',
  ABOUT: 'ABOUT',
  CAREER: 'CAREER',
  PROJECTS: 'PROJECTS',
} as const;

export type PageKey = (typeof PAGE_KEY)[keyof typeof PAGE_KEY];

export const SECTION_TYPE = {
  HERO: 'HERO',
  MARKDOWN: 'MARKDOWN',
  PROJECT_GRID: 'PROJECT_GRID',
  TIMELINE: 'TIMELINE',
  CUSTOM: 'CUSTOM',
} as const;

export type SectionType = (typeof SECTION_TYPE)[keyof typeof SECTION_TYPE];

export type ContentMode = 'published' | 'draft';

export const CONTENT_LANG = {
  KO: 'ko',
  EN: 'en',
  JA: 'ja',
} as const;

export type ContentLang = (typeof CONTENT_LANG)[keyof typeof CONTENT_LANG];

export const DEFAULT_CONTENT_LANG: ContentLang = CONTENT_LANG.KO;

export const SUPPORTED_CONTENT_LANGS: ContentLang[] = [CONTENT_LANG.KO, CONTENT_LANG.EN, CONTENT_LANG.JA];

export function resolveContentLang(lang?: string | null): ContentLang {
  if (lang === CONTENT_LANG.EN || lang === CONTENT_LANG.JA || lang === CONTENT_LANG.KO) {
    return lang;
  }

  return DEFAULT_CONTENT_LANG;
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

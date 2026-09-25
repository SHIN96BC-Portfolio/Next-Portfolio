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

/** 사례 단위 AS-IS → 개선 → TO-BE. toBe 안의 `inline code` 는 수치 배지로 렌더된다. */
export interface ResumeCase {
  title: string;
  asIs: string;
  approach: string;
  decision?: string;
  toBe: string;
}

/** 같은 소속 회사의 프로젝트들 위에 한 번 그려지는 회사 헤더 정보 */
export interface ResumeEmployer {
  period: string;
  detail: string;
}

/**
 * configSchemaVersion 1: problem · workSections · outcomes · extraSections
 * configSchemaVersion 2: scopeTags · overview · cases (+ employer 로 회사별 그룹핑)
 */
export interface ResumeProjectConfig {
  projectId: string;
  orderLabel?: string;
  title: string;
  company: string;
  period: string;
  role: string;
  links: ProjectLink[];
  problem?: string;
  workSections?: ResumeWorkSection[];
  outcomes?: string[];
  extraSections?: ResumeExtraSection[];
  techStack: string[];
  employer?: ResumeEmployer;
  scopeTags?: string[];
  overview?: string;
  cases?: ResumeCase[];
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

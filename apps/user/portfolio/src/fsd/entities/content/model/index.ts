export { PAGE_KEY, type PageKey } from '@FsdShared/config/routing/page-key';
/** @deprecated wire 타입은 `HomeSectionGetRes`, UI는 `HomeSection` 사용 */
export type { HomeSection, HomeSection as HomeSectionRes } from './client/home-section';
export { SECTION_TYPE, type SectionType } from './constants/section-type';
export { default as mapServerHomeSectionToClient } from './mapper/map-server-home-section-to-client';
export type { HomeSectionGetReq, HomeSectionGetRes } from './server/home-section';
export type { ContentMode } from './types/content-mode';
export type {
  ContactConfig,
  EducationConfig,
  EducationItem,
  HeroConfig,
  HeroLink,
  LicenseItem,
  LicensesConfig,
  MarkdownConfig,
  ProjectCompany,
  ProjectGridConfig,
  ProjectItem,
  ProjectLink,
  ProjectLinkGroup,
  ResumeExtraSection,
  ResumeProjectConfig,
  ResumeWorkSection,
  SectionConfig,
  SkillGroup,
  SkillsConfig,
  TimelineConfig,
  TimelineItem,
} from './types/section-config';

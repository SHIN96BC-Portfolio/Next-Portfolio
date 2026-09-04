import type { Locale } from '@FsdShared/config/i18n/auto-gen/constants/i18n-locales';
import type { PageKey } from '@FsdShared/config/routing/page-key';
import type { SectionType } from '../constants/section-type';
import type { ContentMode } from '../types/content-mode';
import type { SectionConfig } from '../types/section-config';

/** API wire — `GET .../sections` query */
export interface HomeSectionGetReq {
  pageKey: PageKey;
  lang: Locale;
  mode?: ContentMode;
}

/** API wire — `GET .../sections` 응답 item */
export interface HomeSectionGetRes {
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

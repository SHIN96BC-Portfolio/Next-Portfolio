import type { SectionType } from '@FsdEntities/content/model/constants/section-type';
import type { SectionConfig } from '@FsdEntities/content/model/types/section-config';
import type { PageKey } from '@FsdShared/config/routing/page-key';

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

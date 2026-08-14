import type { SectionType } from '@FsdEntities/content/model/constants/section-type';
import type { SectionConfig } from '@FsdEntities/content/model/types/section-config';
import type { PageKey } from '@FsdShared/config/routing/page-key';

/** UI/client — 페이지·위젯이 사용하는 섹션 모델 */
export interface HomeSection {
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

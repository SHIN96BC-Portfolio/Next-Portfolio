import type { HomeSectionGetRes } from '@FsdEntities/content/model/server/home-section';
import type { ContentLang } from '@FsdEntities/content/model/types/content-lang';
import type { ContentMode } from '@FsdEntities/content/model/types/content-mode';
import type { PageKey } from '@FsdShared/config/routing/page-key';
import type { CommonRes } from '@core/service-container';

export default interface ContentService {
  getHomeSections(pageKey: PageKey, lang: ContentLang, mode?: ContentMode): Promise<CommonRes<HomeSectionGetRes[]>>;
}

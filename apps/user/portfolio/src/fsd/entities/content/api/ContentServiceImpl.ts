import type ContentService from '@FsdEntities/content/api/ContentService';
import type { HomeSectionGetRes } from '@FsdEntities/content/model/server/home-section';
import type { ContentLang } from '@FsdEntities/content/model/types/content-lang';
import type { ContentMode } from '@FsdEntities/content/model/types/content-mode';
import type { PageKey } from '@FsdShared/config/routing/page-key';
import { CommonRes, CommonServiceBase } from '@core/service-container';

class ContentServiceImpl implements ContentService {
  private readonly base: CommonServiceBase;

  constructor(base: CommonServiceBase) {
    this.base = base;
  }

  getHomeSections(
    pageKey: PageKey,
    lang: ContentLang,
    mode: ContentMode = 'published'
  ): Promise<CommonRes<HomeSectionGetRes[]>> {
    return this.base.http.get<CommonRes<HomeSectionGetRes[]>>(
      `/site/pages/${pageKey}/sections?mode=${mode}&lang=${lang}`
    );
  }
}

export default ContentServiceImpl;

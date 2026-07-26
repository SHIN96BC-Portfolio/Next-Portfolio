import ContentService from '@FsdEntities/content/api/ContentService';
import { ContentMode, HomeSectionRes, PageKey } from '@FsdEntities/content/model/types';
import { CommonRes, CommonServiceBase } from '@Libs/service-container';

class ContentServiceImpl implements ContentService {
  private readonly base: CommonServiceBase;

  constructor(base: CommonServiceBase) {
    this.base = base;
  }

  getHomeSections(pageKey: PageKey, mode: ContentMode = 'published'): Promise<CommonRes<HomeSectionRes[]>> {
    return this.base.http.get<CommonRes<HomeSectionRes[]>>(`/site/pages/${pageKey}/sections?mode=${mode}`);
  }
}

export default ContentServiceImpl;

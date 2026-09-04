import { CommonRes, CommonServiceBase } from '@core/service-container';
import type { HomeSectionGetReq, HomeSectionGetRes } from '../model/server/home-section';
import type ContentService from './ContentService';

class ContentServiceImpl implements ContentService {
  private readonly base: CommonServiceBase;

  constructor(base: CommonServiceBase) {
    this.base = base;
  }

  getHomeSections(params: HomeSectionGetReq): Promise<CommonRes<HomeSectionGetRes[]>> {
    const { pageKey, lang, mode = 'published' } = params;
    return this.base.http.get<CommonRes<HomeSectionGetRes[]>>(
      `/site/pages/${pageKey}/sections?mode=${mode}&lang=${lang}`
    );
  }
}

export default ContentServiceImpl;

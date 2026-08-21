import type { HomeSectionGetReq, HomeSectionGetRes } from '@FsdEntities/content/model/server/home-section';
import type { CommonRes } from '@core/service-container';

export default interface ContentService {
  getHomeSections(params: HomeSectionGetReq): Promise<CommonRes<HomeSectionGetRes[]>>;
}

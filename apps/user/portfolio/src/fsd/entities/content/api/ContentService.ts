import type { CommonRes } from '@core/service-container';
import type { HomeSectionGetReq, HomeSectionGetRes } from '../model/server/home-section';

export default interface ContentService {
  getHomeSections(params: HomeSectionGetReq): Promise<CommonRes<HomeSectionGetRes[]>>;
}

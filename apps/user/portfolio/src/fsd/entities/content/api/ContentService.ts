import { ContentMode, HomeSectionRes, PageKey } from '@FsdEntities/content/model/types';
import { CommonRes } from '@Libs/service-container';

export default interface ContentService {
  getHomeSections(pageKey: PageKey, mode?: ContentMode): Promise<CommonRes<HomeSectionRes[]>>;
}

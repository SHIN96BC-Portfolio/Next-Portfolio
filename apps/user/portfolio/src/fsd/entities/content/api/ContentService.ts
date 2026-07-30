import { ContentLang, ContentMode, HomeSectionRes, PageKey } from '@FsdEntities/content/model/types';
import { CommonRes } from '@Libs/service-container';

export default interface ContentService {
  getHomeSections(pageKey: PageKey, lang: ContentLang, mode?: ContentMode): Promise<CommonRes<HomeSectionRes[]>>;
}

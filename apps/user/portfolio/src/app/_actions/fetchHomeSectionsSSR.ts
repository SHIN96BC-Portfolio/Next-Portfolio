import ContentService from '@FsdEntities/content/api/ContentService';
import { getPortfolioHomeSectionsMock } from '@FsdEntities/content/model/mock/portfolio-home-sections';
import {
  ContentLang,
  ContentMode,
  HomeSectionRes,
  PAGE_KEY,
  resolveContentLang,
} from '@FsdEntities/content/model/types';
import { serviceContainer } from '@FsdShared/config/service/service.setup';
import { SERVICE_NAME } from '@Libs/service-container';

export default async function fetchHomeSectionsSSR(
  lang: ContentLang,
  pageKey = PAGE_KEY.HOME,
  mode: ContentMode = 'published'
): Promise<HomeSectionRes[]> {
  const contentLang = resolveContentLang(lang);

  try {
    const service = serviceContainer.get<ContentService>(SERVICE_NAME.CONTENT);
    const response = await service.getHomeSections(pageKey, contentLang, mode);

    if (response.result && response.result.length > 0) {
      return response.result;
    }
  } catch (error) {
    console.error('[fetchHomeSectionsSSR] API failed, using mock fallback:', error);
  }

  return getPortfolioHomeSectionsMock(contentLang);
}

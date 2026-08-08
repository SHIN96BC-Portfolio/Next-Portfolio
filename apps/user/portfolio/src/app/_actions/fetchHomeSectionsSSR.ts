import ContentService from '@FsdEntities/content/api/ContentService';
import { getPortfolioCareerSectionsMock } from '@FsdEntities/content/model/mock/portfolio-career-sections';
import { getPortfolioHomeSectionsMock } from '@FsdEntities/content/model/mock/portfolio-home-sections';
import {
  ContentLang,
  ContentMode,
  HomeSectionRes,
  PAGE_KEY,
  PageKey,
  resolveContentLang,
} from '@FsdEntities/content/model/types';
import { serviceContainer } from '@FsdShared/config/service/service.setup';
import { SERVICE_NAME } from '@core/service-container';

export default async function fetchHomeSectionsSSR(
  lang: ContentLang,
  pageKey: PageKey = PAGE_KEY.HOME,
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

  if (pageKey === PAGE_KEY.CAREER) {
    return getPortfolioCareerSectionsMock(contentLang);
  }

  return getPortfolioHomeSectionsMock(contentLang);
}

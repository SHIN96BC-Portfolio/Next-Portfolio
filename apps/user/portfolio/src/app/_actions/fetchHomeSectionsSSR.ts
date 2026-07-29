import ContentService from '@FsdEntities/content/api/ContentService';
import { portfolioHomeSectionsMock } from '@FsdEntities/content/model/mock/portfolio-home-sections';
import { ContentMode, HomeSectionRes, PAGE_KEY } from '@FsdEntities/content/model/types';
import { serviceContainer } from '@FsdShared/config/service/service.setup';
import { SERVICE_NAME } from '@Libs/service-container';

export default async function fetchHomeSectionsSSR(
  pageKey = PAGE_KEY.HOME,
  mode: ContentMode = 'published'
): Promise<HomeSectionRes[]> {
  try {
    const service = serviceContainer.get<ContentService>(SERVICE_NAME.CONTENT);
    const response = await service.getHomeSections(pageKey, mode);

    if (response.result && response.result.length > 0) {
      return response.result;
    }
  } catch (error) {
    console.error('[fetchHomeSectionsSSR] API failed, using mock fallback:', error);
  }

  return portfolioHomeSectionsMock;
}

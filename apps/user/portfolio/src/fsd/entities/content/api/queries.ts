import ContentService from '@FsdEntities/content/api/ContentService';
import { ContentLang, ContentMode, HomeSectionRes, PAGE_KEY } from '@FsdEntities/content/model/types';
import { serviceContainer } from '@FsdShared/config/service/service.setup';
import { CommonRes, SERVICE_NAME } from '@core/service-container';

const queryKeys = {
  homeSections: (pageKey: string, lang: ContentLang, mode: ContentMode) =>
    ['homeSections', pageKey, lang, mode] as const,
};

const queryOptions = {
  homeSections: (pageKey = PAGE_KEY.HOME, lang: ContentLang, mode: ContentMode = 'published') => ({
    queryKey: queryKeys.homeSections(pageKey, lang, mode),
    queryFn: async (): Promise<CommonRes<HomeSectionRes[]>> => {
      const service = serviceContainer.get<ContentService>(SERVICE_NAME.CONTENT);
      return service.getHomeSections(pageKey, lang, mode);
    },
  }),
};

export default queryOptions;

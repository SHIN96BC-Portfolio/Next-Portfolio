import ContentService from '@FsdEntities/content/api/ContentService';
import { ContentMode, HomeSectionRes, PAGE_KEY } from '@FsdEntities/content/model/types';
import { serviceContainer } from '@FsdShared/config/service/service.setup';
import { CommonRes, SERVICE_NAME } from '@Libs/service-container';

const queryKeys = {
  homeSections: (pageKey: string, mode: ContentMode) => ['homeSections', pageKey, mode] as const,
};

const queryOptions = {
  homeSections: (pageKey = PAGE_KEY.HOME, mode: ContentMode = 'published') => ({
    queryKey: queryKeys.homeSections(pageKey, mode),
    queryFn: async (): Promise<CommonRes<HomeSectionRes[]>> => {
      const service = serviceContainer.get<ContentService>(SERVICE_NAME.CONTENT);
      return service.getHomeSections(pageKey, mode);
    },
  }),
};

export default queryOptions;

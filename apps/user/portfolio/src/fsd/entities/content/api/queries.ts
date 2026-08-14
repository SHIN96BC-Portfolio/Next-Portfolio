import type { HomeSection } from '@FsdEntities/content/model/client/home-section';
import mapServerHomeSectionToClient from '@FsdEntities/content/model/mapper/map-server-home-section-to-client';
import type { ContentLang } from '@FsdEntities/content/model/types/content-lang';
import type { ContentMode } from '@FsdEntities/content/model/types/content-mode';
import { PAGE_KEY, type PageKey } from '@FsdShared/config/routing/page-key';
import { serviceContainer } from '@FsdShared/config/service/service.setup';
import { SERVICE_KEY } from '@FsdShared/config/service/service-map';
import type { CommonRes } from '@core/service-container';

const queryKeys = {
  findHomeSections: (pageKey: PageKey, lang: ContentLang, mode: ContentMode) =>
    ['findHomeSections', pageKey, lang, mode] as const,
};

const queryOptions = {
  findHomeSections: (pageKey: PageKey = PAGE_KEY.HOME, lang: ContentLang, mode: ContentMode = 'published') => ({
    queryKey: queryKeys.findHomeSections(pageKey, lang, mode),
    queryFn: async (): Promise<CommonRes<HomeSection[]>> => {
      const service = serviceContainer.get(SERVICE_KEY.CONTENT);
      const response = await service.getHomeSections(pageKey, lang, mode);

      return {
        ...response,
        result: response.result ? mapServerHomeSectionToClient(response.result) : undefined,
      };
    },
  }),
};

export default queryOptions;

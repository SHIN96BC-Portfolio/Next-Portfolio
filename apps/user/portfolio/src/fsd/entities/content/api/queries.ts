import type { Locale } from '@FsdShared/config/i18n/auto-gen/constants/i18n-locales';
import { PAGE_KEY, type PageKey } from '@FsdShared/config/routing/page-key';
import { serviceContainer } from '@FsdShared/config/service/service.setup';
import { SERVICE_KEY } from '@FsdShared/config/service/service-map';
import type { CommonRes } from '@core/service-container';
import type { HomeSection } from '../model/client/home-section';
import mapServerHomeSectionToClient from '../model/mapper/map-server-home-section-to-client';
import type { ContentMode } from '../model/types/content-mode';

const queryKeys = {
  findHomeSections: (pageKey: PageKey, lang: Locale, mode: ContentMode) =>
    ['findHomeSections', pageKey, lang, mode] as const,
};

const queryOptions = {
  findHomeSections: (pageKey: PageKey = PAGE_KEY.HOME, lang: Locale, mode: ContentMode = 'published') => ({
    queryKey: queryKeys.findHomeSections(pageKey, lang, mode),
    queryFn: async (): Promise<CommonRes<HomeSection[]>> => {
      const service = serviceContainer.get(SERVICE_KEY.CONTENT);
      const response = await service.getHomeSections({ pageKey, lang, mode });

      return {
        ...response,
        result: response.result ? mapServerHomeSectionToClient(response.result) : undefined,
      };
    },
  }),
};

export default queryOptions;

import type { HomeSection } from '@FsdEntities/content/model/client/home-section';
import mapServerHomeSectionToClient from '@FsdEntities/content/model/mapper/map-server-home-section-to-client';
import { getPortfolioCareerSectionsMock } from '@FsdEntities/content/model/mock/portfolio-career-sections';
import { getPortfolioHomeSectionsMock } from '@FsdEntities/content/model/mock/portfolio-home-sections';
import type { ContentMode } from '@FsdEntities/content/model/types/content-mode';
import type { Locale } from '@FsdShared/config/i18n/auto-gen/constants/i18n-locales';
import { resolveLocale } from '@FsdShared/config/i18n/constants/resolve-locale';
import { PAGE_KEY, type PageKey } from '@FsdShared/config/routing/page-key';
import { serviceContainer } from '@FsdShared/config/service/service.setup';
import { SERVICE_KEY } from '@FsdShared/config/service/service-map';

export default async function fetchHomeSectionsSSR(
  lang: Locale,
  pageKey: PageKey = PAGE_KEY.HOME,
  mode: ContentMode = 'published'
): Promise<HomeSection[]> {
  const locale = resolveLocale(lang);

  try {
    const service = serviceContainer.get(SERVICE_KEY.CONTENT);
    const response = await service.getHomeSections({ pageKey, lang: locale, mode });

    if (response.result && response.result.length > 0) {
      return mapServerHomeSectionToClient(response.result);
    }
  } catch (error) {
    console.error('[fetchHomeSectionsSSR] API failed, using mock fallback:', error);
  }

  if (pageKey === PAGE_KEY.CAREER) {
    return mapServerHomeSectionToClient(getPortfolioCareerSectionsMock(locale));
  }

  return mapServerHomeSectionToClient(getPortfolioHomeSectionsMock(locale));
}

import { ContentLang, resolveContentLang } from '@FsdEntities/content/model';
import { SiteGnb } from '@FsdEntities/site/model/client/gnb';
import mapServerGnbToClient from '@FsdEntities/site/model/mapper/map-server-gnb-to-client';
import { getPortfolioNavigationMock } from '@FsdEntities/site/model/mock/portfolio-navigation';
import { serviceContainer } from '@FsdShared/config/service/service.setup';
import { SERVICE_KEY } from '@FsdShared/config/service/service-map';

export default async function fetchGnbSSR(lang: ContentLang): Promise<SiteGnb[]> {
  const contentLang = resolveContentLang(lang);

  try {
    const service = serviceContainer.get(SERVICE_KEY.SITE);
    const response = await service.getGnb(contentLang);

    if (response.result && response.result.length > 0) {
      return mapServerGnbToClient(response.result);
    }
  } catch (error) {
    console.error('[fetchGnbSSR] API failed, using mock fallback:', error);
  }

  return getPortfolioNavigationMock(contentLang);
}

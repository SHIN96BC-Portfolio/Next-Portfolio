import { getPortfolioNavigationMock } from '@FsdEntities/site/model/mock/portfolio-navigation';
import { resolveLocale } from '@FsdShared/config/i18n/constants/resolve-locale';
import { addDelay } from '@FsdShared/config/mock/handlers';
import { host } from '@FsdShared/config/mock/mock.config';
import { HttpResponse, http } from 'msw';

const siteMockHandler = [
  http.get(`${host}/site/gnb`, async ({ request }) => {
    const url = new URL(request.url);
    const lang = resolveLocale(url.searchParams.get('lang'));

    console.info(`msw get /site/gnb?lang=${lang}`);

    return addDelay(
      HttpResponse.json({
        status: 200,
        ok: true,
        result: getPortfolioNavigationMock(lang),
      }),
      300
    );
  }),
];

export default siteMockHandler;

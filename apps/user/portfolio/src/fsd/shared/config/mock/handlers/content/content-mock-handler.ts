import { getPortfolioHomeSectionsMock } from '@FsdEntities/content/model/mock/portfolio-home-sections';
import { resolveContentLang } from '@FsdEntities/content/model/types';
import { addDelay } from '@FsdShared/config/mock/handlers';
import { host } from '@FsdShared/config/mock/mock.config';
import { HttpResponse, http } from 'msw';

const contentMockHandler = [
  http.get(`${host}/site/pages/:pageKey/sections`, async ({ params, request }) => {
    const { pageKey } = params;
    const url = new URL(request.url);
    const mode = url.searchParams.get('mode') ?? 'published';
    const lang = resolveContentLang(url.searchParams.get('lang'));

    console.info(`msw get /site/pages/${pageKey}/sections?mode=${mode}&lang=${lang}`);

    if (pageKey !== 'HOME') {
      return addDelay(
        HttpResponse.json({
          status: 200,
          message: 'OK',
          ok: true,
          result: [],
        }),
        300
      );
    }

    return addDelay(
      HttpResponse.json({
        status: 200,
        message: 'OK',
        ok: true,
        result: getPortfolioHomeSectionsMock(lang),
      }),
      500
    );
  }),
];

export default contentMockHandler;

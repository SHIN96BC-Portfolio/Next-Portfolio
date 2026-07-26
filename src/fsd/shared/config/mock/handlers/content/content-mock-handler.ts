import { portfolioHomeSectionsMock } from '@FsdEntities/content/model/mock/portfolio-home-sections';
import { addDelay } from '@FsdShared/config/mock/handlers';
import { host } from '@FsdShared/config/mock/mock.config';
import { HttpResponse, http } from 'msw';

const contentMockHandler = [
  http.get(`${host}/site/pages/:pageKey/sections`, async ({ params, request }) => {
    const { pageKey } = params;
    const url = new URL(request.url);
    const mode = url.searchParams.get('mode') ?? 'published';

    console.info(`msw get /site/pages/${pageKey}/sections?mode=${mode}`);

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
        result: portfolioHomeSectionsMock,
      }),
      500
    );
  }),
];

export default contentMockHandler;

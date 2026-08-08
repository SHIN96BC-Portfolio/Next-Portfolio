import { getPortfolioCareerSectionsMock } from '@FsdEntities/content/model/mock/portfolio-career-sections';
import { getPortfolioHomeSectionsMock } from '@FsdEntities/content/model/mock/portfolio-home-sections';
import { PAGE_KEY, resolveContentLang } from '@FsdEntities/content/model/types';
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

    const sections =
      pageKey === PAGE_KEY.CAREER
        ? getPortfolioCareerSectionsMock(lang)
        : pageKey === PAGE_KEY.HOME
          ? getPortfolioHomeSectionsMock(lang)
          : [];

    return addDelay(
      HttpResponse.json({
        status: 200,
        message: 'OK',
        ok: true,
        result: sections,
      }),
      pageKey === PAGE_KEY.HOME ? 500 : 300
    );
  }),
];

export default contentMockHandler;

import { PAGE_KEY, PageKey } from '@FsdEntities/content/model/types';

/** 포트폴리오 앱 전용 라우트 레지스트리 (URL segment ↔ CMS page_key) */
export const SITE_LAYOUT = {
  LANDING: 'landing',
  DOCUMENT: 'document',
} as const;

export type SiteLayout = (typeof SITE_LAYOUT)[keyof typeof SITE_LAYOUT];

export interface PortfolioRouteConfig {
  /** `[lang]` 이후 경로 segment. 홈은 빈 문자열 */
  segment: string;
  pageKey: PageKey;
  layout: SiteLayout;
}

export const PORTFOLIO_ROUTES = {
  home: {
    segment: '',
    pageKey: PAGE_KEY.HOME,
    layout: SITE_LAYOUT.LANDING,
  },
  homePrint: {
    segment: 'print',
    pageKey: PAGE_KEY.HOME,
    layout: SITE_LAYOUT.DOCUMENT,
  },
  resume: {
    segment: 'resume',
    pageKey: PAGE_KEY.CAREER,
    layout: SITE_LAYOUT.DOCUMENT,
  },
  resumePrint: {
    segment: 'resume/print',
    pageKey: PAGE_KEY.CAREER,
    layout: SITE_LAYOUT.DOCUMENT,
  },
} as const satisfies Record<string, PortfolioRouteConfig>;

export type PortfolioRouteId = keyof typeof PORTFOLIO_ROUTES;

type PortfolioRouteSegment = (typeof PORTFOLIO_ROUTES)[PortfolioRouteId]['segment'];

const ROUTE_BY_SEGMENT = new Map<PortfolioRouteSegment, PortfolioRouteConfig>(
  Object.values(PORTFOLIO_ROUTES).map((route) => [route.segment, route])
);

/** `/ko/resume` → resume route config */
export function resolvePortfolioRoute(pathname: string): PortfolioRouteConfig {
  const segments = pathname.split('/').filter(Boolean);
  const routePath = segments.slice(1).join('/');

  if (routePath === PORTFOLIO_ROUTES.resumePrint.segment) {
    return PORTFOLIO_ROUTES.resumePrint;
  }

  const routeSegment = (routePath.split('/')[0] ?? '') as PortfolioRouteSegment;

  return ROUTE_BY_SEGMENT.get(routeSegment) ?? PORTFOLIO_ROUTES.home;
}

export function buildPortfolioPath(lang: string, routeId: PortfolioRouteId): string {
  const { segment } = PORTFOLIO_ROUTES[routeId];
  return segment ? `/${lang}/${segment}` : `/${lang}`;
}

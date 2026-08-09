import { PAGE_KEY, PageKey } from '@FsdEntities/content/model/types';

/** 페이지 shell 종류 — LANDING(홈 GNB+섹션 nav), DOCUMENT(단순 헤더) */
export const SITE_LAYOUT = {
  /** 홈 랜딩 — 2단 헤더 + 섹션 앵커 nav */
  LANDING: 'landing',
  /** 문서형 페이지 — 이력서·인쇄 등 */
  DOCUMENT: 'document',
} as const;

export type SiteLayout = (typeof SITE_LAYOUT)[keyof typeof SITE_LAYOUT];

export interface PortfolioRouteConfig {
  /** `[lang]` 이후 경로 segment. 홈은 빈 문자열 */
  segment: string;
  pageKey: PageKey;
  layout: SiteLayout;
}

/**
 * 포트폴리오 앱 라우트 레지스트리.
 * URL segment, CMS `pageKey`, 사용할 layout shell을 한곳에서 관리합니다.
 */
export const PORTFOLIO_ROUTES = {
  /** 홈 랜딩 (`/[lang]`) */
  home: {
    segment: '',
    pageKey: PAGE_KEY.HOME,
    layout: SITE_LAYOUT.LANDING,
  },
  /** 홈 인쇄 전용 (`/[lang]/print`) */
  homePrint: {
    segment: 'print',
    pageKey: PAGE_KEY.HOME,
    layout: SITE_LAYOUT.DOCUMENT,
  },
  /** 경력기술서 (`/[lang]/resume`) */
  resume: {
    segment: 'resume',
    pageKey: PAGE_KEY.CAREER,
    layout: SITE_LAYOUT.DOCUMENT,
  },
  /** 경력기술서 인쇄 전용 (`/[lang]/resume/print`) */
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

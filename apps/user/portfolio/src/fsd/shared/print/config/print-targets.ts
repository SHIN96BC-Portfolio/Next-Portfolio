import { buildPortfolioPath, PortfolioRouteId } from '@FsdShared/config/routing/site-routes';

export function buildPortfolioPrintPath(
  lang: string,
  routeId: Extract<PortfolioRouteId, 'homePrint' | 'resumePrint'>
): string {
  return buildPortfolioPath(lang, routeId);
}

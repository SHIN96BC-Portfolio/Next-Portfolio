/** 모바일 헤더(h-14) 높이 */
export const PORTFOLIO_LANDING_HEADER_OFFSET_MOBILE = 56;

/** PC 헤더(h-16) + HomeSectionNav 높이 */
export const PORTFOLIO_LANDING_HEADER_OFFSET_DESKTOP = 112;

export function getPortfolioLandingHeaderOffset() {
  if (typeof window === 'undefined') {
    return PORTFOLIO_LANDING_HEADER_OFFSET_DESKTOP;
  }

  return window.matchMedia('(min-width: 768px)').matches
    ? PORTFOLIO_LANDING_HEADER_OFFSET_DESKTOP
    : PORTFOLIO_LANDING_HEADER_OFFSET_MOBILE;
}

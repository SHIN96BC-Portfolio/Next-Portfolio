/**
 * 모바일 헤더 높이(px).
 * `PortfolioHeaderBar`의 `h-14`(3.5rem)와 맞춰 Hero·섹션 스크롤 offset에 사용합니다.
 */
export const PORTFOLIO_LANDING_HEADER_OFFSET_MOBILE = 56;

/**
 * PC 헤더 높이(px).
 * `h-16`(4rem) + `HomeSectionNav`(2차 nav) 합산값으로, Hero·섹션 스크롤 offset에 사용합니다.
 */
export const PORTFOLIO_LANDING_HEADER_OFFSET_DESKTOP = 112;

/**
 * sticky 헤더 높이를 반환합니다.
 * 섹션 앵커 스크롤·Hero `min-height` 계산에 공통으로 씁니다.
 *
 * - SSR: PC 기준값 반환
 * - CSR: `md`(768px) 이상이면 PC, 미만이면 모바일 값 반환
 */
export function getPortfolioLandingHeaderOffset() {
  if (typeof window === 'undefined') {
    return PORTFOLIO_LANDING_HEADER_OFFSET_DESKTOP;
  }

  return window.matchMedia('(min-width: 768px)').matches
    ? PORTFOLIO_LANDING_HEADER_OFFSET_DESKTOP
    : PORTFOLIO_LANDING_HEADER_OFFSET_MOBILE;
}

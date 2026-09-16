import { PAGE_KEY } from '@FsdShared/config/routing/page-key';
import { buildPortfolioPath, resolvePortfolioRoute, SITE_LAYOUT } from './site-routes';

describe('resolvePortfolioRoute', () => {
  it('resolves home and resume layouts', () => {
    expect(resolvePortfolioRoute('/ko')).toMatchObject({
      pageKey: PAGE_KEY.HOME,
      layout: SITE_LAYOUT.LANDING,
    });
    expect(resolvePortfolioRoute('/ko/resume')).toMatchObject({
      pageKey: PAGE_KEY.CAREER,
      layout: SITE_LAYOUT.DOCUMENT,
    });
  });

  it('prefers resumePrint over resume', () => {
    expect(resolvePortfolioRoute('/en/resume/print')).toMatchObject({
      segment: 'resume/print',
      pageKey: PAGE_KEY.CAREER,
    });
  });

  it('falls back to home for unknown segments', () => {
    expect(resolvePortfolioRoute('/ko/unknown')).toMatchObject({
      pageKey: PAGE_KEY.HOME,
      layout: SITE_LAYOUT.LANDING,
    });
  });
});

describe('buildPortfolioPath', () => {
  it('builds lang-prefixed paths', () => {
    expect(buildPortfolioPath('ko', 'home')).toBe('/ko');
    expect(buildPortfolioPath('ko', 'resume')).toBe('/ko/resume');
    expect(buildPortfolioPath('en', 'homePrint')).toBe('/en/print');
  });
});

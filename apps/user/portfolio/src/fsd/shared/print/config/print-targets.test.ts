import { buildPortfolioPrintPath } from './print-targets';

describe('buildPortfolioPrintPath', () => {
  it('builds print routes via site-routes', () => {
    expect(buildPortfolioPrintPath('ko', 'homePrint')).toBe('/ko/print');
    expect(buildPortfolioPrintPath('en', 'resumePrint')).toBe('/en/resume/print');
  });
});

import { isGnbLinkActive, resolveGnbHref } from './resolve-gnb-href';

describe('resolveGnbHref', () => {
  it('prefixes lang for relative paths', () => {
    expect(resolveGnbHref('/resume', 'ko')).toBe('/ko/resume');
    expect(resolveGnbHref('resume', 'en')).toBe('/en/resume');
    expect(resolveGnbHref('/', 'ko')).toBe('/ko');
  });

  it('keeps absolute urls and empty path', () => {
    expect(resolveGnbHref('https://example.com', 'ko')).toBe('https://example.com');
    expect(resolveGnbHref('http://example.com/a', 'ko')).toBe('http://example.com/a');
    expect(resolveGnbHref('', 'ko')).toBe('');
  });

  it('does not double-prefix when path already has locale', () => {
    expect(resolveGnbHref('/ko/resume', 'en')).toBe('/ko/resume');
  });
});

describe('isGnbLinkActive', () => {
  it('matches pathname to gnb path under lang', () => {
    expect(isGnbLinkActive('/ko', '/', 'ko')).toBe(true);
    expect(isGnbLinkActive('/ko/', '/', 'ko')).toBe(true);
    expect(isGnbLinkActive('/ko/resume', '/resume', 'ko')).toBe(true);
    expect(isGnbLinkActive('/ko/resume', '/', 'ko')).toBe(false);
  });
});

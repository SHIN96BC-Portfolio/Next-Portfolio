import { DEFAULT_LOCALE, isLocale, resolveLocale } from './resolve-locale';

describe('resolve-locale', () => {
  it('isLocale accepts supported locales only', () => {
    expect(isLocale('ko')).toBe(true);
    expect(isLocale('en')).toBe(true);
    expect(isLocale('ja')).toBe(true);
    expect(isLocale('fr')).toBe(false);
    expect(isLocale(null)).toBe(false);
    expect(isLocale(undefined)).toBe(false);
  });

  it('resolveLocale falls back to DEFAULT_LOCALE', () => {
    expect(resolveLocale('ko')).toBe('ko');
    expect(resolveLocale('EN')).toBe(DEFAULT_LOCALE);
    expect(resolveLocale(undefined)).toBe(DEFAULT_LOCALE);
    expect(resolveLocale('')).toBe(DEFAULT_LOCALE);
  });
});

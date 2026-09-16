import {
  DEFAULT_THEME_TYPE,
  getOppositeThemeType,
  getThemeDomClassName,
  isDarkTheme,
  isThemeType,
  resolveThemeType,
  THEME_TYPE,
} from './theme';

describe('theme helpers', () => {
  it('isThemeType and resolveThemeType', () => {
    expect(isThemeType('light')).toBe(true);
    expect(isThemeType('dark')).toBe(true);
    expect(isThemeType('system')).toBe(false);
    expect(resolveThemeType('dark')).toBe(THEME_TYPE.DARK);
    expect(resolveThemeType('nope')).toBe(DEFAULT_THEME_TYPE);
    expect(resolveThemeType(null)).toBe(DEFAULT_THEME_TYPE);
  });

  it('toggles and maps dom class', () => {
    expect(isDarkTheme(THEME_TYPE.DARK)).toBe(true);
    expect(getOppositeThemeType(THEME_TYPE.LIGHT)).toBe(THEME_TYPE.DARK);
    expect(getOppositeThemeType(THEME_TYPE.DARK)).toBe(THEME_TYPE.LIGHT);
    expect(getThemeDomClassName(THEME_TYPE.DARK)).toBe('dark');
    expect(getThemeDomClassName(THEME_TYPE.LIGHT)).toBe('');
  });
});

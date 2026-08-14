/**
 * 테마 식별자 상수.
 * 쿠키(`COOKIE_THEME_NAME`) 값과 `<html style="color-scheme">`에 저장·적용되는 문자열입니다.
 */
export const THEME_TYPE = {
  /** 라이트 모드 */
  LIGHT: 'light',
  /** 다크 모드 */
  DARK: 'dark',
} as const;

/** `THEME_TYPE` 값의 유니온 타입 */
export type ThemeType = (typeof THEME_TYPE)[keyof typeof THEME_TYPE];

/** 테마 쿠키가 없거나 잘못된 값일 때 fallback으로 쓰는 기본 테마 */
export const DEFAULT_THEME_TYPE: ThemeType = THEME_TYPE.LIGHT;

/**
 * `<html>` 요소에 붙이는 Tailwind dark 모드 관련 클래스명.
 * `dark` 클래스가 있어야 `dark:` 변형 스타일이 적용됩니다.
 */
export const THEME_DOM_CLASS = {
  /** 다크 모드 활성화 클래스 */
  DARK: 'dark',
} as const;

/** `isThemeType` 검사에 쓰는 허용 테마 목록 */
export const SUPPORTED_THEME_TYPES: ThemeType[] = [THEME_TYPE.LIGHT, THEME_TYPE.DARK];

/** 문자열이 지원 테마(`light` / `dark`)인지 검사 */
export function isThemeType(value?: string | null): value is ThemeType {
  return SUPPORTED_THEME_TYPES.includes(value as ThemeType);
}

/**
 * 쿠키·헤더 등에서 읽은 값을 안전한 `ThemeType`으로 변환.
 * 지원하지 않는 값이면 `DEFAULT_THEME_TYPE`을 반환합니다.
 */
export function resolveThemeType(value?: string | null): ThemeType {
  return isThemeType(value) ? value : DEFAULT_THEME_TYPE;
}

/** 현재 테마가 다크 모드인지 여부 */
export function isDarkTheme(theme: ThemeType): boolean {
  return theme === THEME_TYPE.DARK;
}

/** 테마 토글 시 반대 테마를 반환 (`light` ↔ `dark`) */
export function getOppositeThemeType(theme: ThemeType): ThemeType {
  return isDarkTheme(theme) ? THEME_TYPE.LIGHT : THEME_TYPE.DARK;
}

/**
 * `<html className>`에 넣을 클래스 문자열.
 * 다크 모드일 때만 `dark`를 반환하고, 라이트 모드일 때는 빈 문자열입니다.
 */
export function getThemeDomClassName(theme: ThemeType): string {
  return isDarkTheme(theme) ? THEME_DOM_CLASS.DARK : '';
}

export default undefined;

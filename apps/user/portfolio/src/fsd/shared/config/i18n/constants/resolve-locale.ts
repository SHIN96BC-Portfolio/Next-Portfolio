import { I18N_LOCALE, Locale, supportedLocales } from '../auto-gen/constants/i18n-locales';

/**
 * 앱 기본 언어 locale.
 * URL·쿠키·params에서 언어를 찾지 못했을 때 이 값(`ko`)으로 fallback합니다.
 */
export const DEFAULT_LOCALE: Locale = I18N_LOCALE.KO;

/** 문자열이 지원 locale(`ko` / `en` / `ja`)인지 검사 */
export function isLocale(value?: string | null): value is Locale {
  return supportedLocales.includes(value as Locale);
}

/**
 * 라우트 params·쿠키 등에서 읽은 값을 안전한 `Locale`로 변환.
 * 지원하지 않는 값이면 `DEFAULT_LOCALE`을 반환합니다.
 */
export function resolveLocale(value?: string | null): Locale {
  return isLocale(value) ? value : DEFAULT_LOCALE;
}

/**
 * Client Component 전용 i18n 진입점.
 *
 * - 브라우저/Client Component에서 안전하게 쓸 수 있는 상수·타입·헬퍼만 export합니다.
 * - `getI18nTranslator` 등 `server-only` 모듈은 여기서 export하지 않습니다.
 * - Client에서는 반드시 `@FsdShared/config/i18n/client`를 import하세요.
 */
export type { Locale } from './auto-gen/constants/i18n-locales';
/** locale 코드 상수 (`I18N_LOCALE.KO` = `'ko'` 등) */
/** 언어 선택 UI(SelectBox·버튼 그룹)용 label/value 목록 */
/** 지원 locale 문자열 배열 — `isLocale` 검사에 사용 */
export { I18N_LOCALE, I18N_LOCALE_OPTIONS, supportedLocales } from './auto-gen/constants/i18n-locales';

export type { Namespace } from './auto-gen/constants/i18n-namespaces';

/** 번역 사전 namespace 상수 (`home`, `common` 등) */
export { I18N_DICTIONARY_NAMESPACE } from './auto-gen/constants/i18n-namespaces';

export { DEFAULT_LOCALE, isLocale, resolveLocale } from './constants/resolve-locale';

/**
 * CMS·mock API 콘텐츠 언어 코드.
 * URL locale(`/[lang]/...`)과 동일한 문자열 값을 사용합니다.
 */
export const CONTENT_LANG = {
  /** 한국어 */
  KO: 'ko',
  /** 영어 */
  EN: 'en',
  /** 일본어 */
  JA: 'ja',
} as const;

/** `CONTENT_LANG` 값의 유니온 타입 */
export type ContentLang = (typeof CONTENT_LANG)[keyof typeof CONTENT_LANG];

/** API·mock 요청 시 lang을 지정하지 않았을 때의 기본 콘텐츠 언어 */
export const DEFAULT_CONTENT_LANG: ContentLang = CONTENT_LANG.KO;

/** `resolveContentLang` 검사에 쓰는 허용 콘텐츠 언어 목록 */
export const SUPPORTED_CONTENT_LANGS: ContentLang[] = [CONTENT_LANG.KO, CONTENT_LANG.EN, CONTENT_LANG.JA];

/**
 * API·SSR에서 받은 lang 문자열을 `ContentLang`으로 정규화.
 * 지원하지 않는 값이면 `DEFAULT_CONTENT_LANG`을 반환합니다.
 */
export function resolveContentLang(lang?: string | null): ContentLang {
  if (isContentLang(lang)) {
    return lang;
  }

  return DEFAULT_CONTENT_LANG;
}

function isContentLang(lang?: string | null): lang is ContentLang {
  return SUPPORTED_CONTENT_LANGS.includes(lang as ContentLang);
}

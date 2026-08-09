import { COOKIE_LANG_NAME } from '@FsdShared/config/cookie/model';
import { DEFAULT_LOCALE, isLocale, resolveLocale } from '@FsdShared/config/i18n/client';
import { NextRequest } from 'next/server';

/**
 * proxy(미들웨어)에서 요청별 선호 언어를 결정합니다.
 *
 * 우선순위:
 * 1. URL 첫 segment (`/ko/...`)
 * 2. 언어 쿠키
 * 3. Accept-Language 헤더
 * 4. `DEFAULT_LOCALE`
 */
export default function getPreferredLang(request: NextRequest): string {
  const { pathname } = request.nextUrl;
  const cookies = request.cookies;
  const acceptLanguage = request.headers.get('accept-language');

  // 현재 경로에서 언어 추출
  let lang = pathname.split('/')[1];

  // 지원하는 언어가 아니거나 없는 경우 → 쿠키 or Accept-Language 기반 결정
  if (!isLocale(lang)) {
    lang = cookies.get(COOKIE_LANG_NAME)?.value || acceptLanguage?.split(',')[0].split('-')[0] || DEFAULT_LOCALE;
  }

  return resolveLocale(lang);
}

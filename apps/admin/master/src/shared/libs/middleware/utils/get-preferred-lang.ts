// 언어 결정 함수

import { COOKIE_NAME, defaultLocale, supportedLocales } from '@Src/shared/libs/middleware/middleware-constants';
import { NextRequest } from 'next/server';

export default function getPreferredLang(request: NextRequest): string {
  const { pathname } = request.nextUrl;
  const cookies = request.cookies;
  const acceptLanguage = request.headers.get('accept-language');

  // 현재 경로에서 언어 추출
  let lang = pathname.split('/')[1];

  // 지원하는 언어가 아니거나 없는 경우 → 쿠키 or Accept-Language 기반 결정
  if (!supportedLocales.includes(lang)) {
    lang = cookies.get(COOKIE_NAME)?.value || acceptLanguage?.split(',')[0].split('-')[0] || defaultLocale;
  }

  return supportedLocales.includes(lang) ? lang : defaultLocale;
}

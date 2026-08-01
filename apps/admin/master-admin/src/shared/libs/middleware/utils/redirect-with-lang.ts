import { COOKIE_AGE, COOKIE_NAME } from '@Src/shared/libs/middleware/middleware-constants';
import { NextRequest, NextResponse } from 'next/server';

// 리디렉트 함수
export default function redirectWithLang(request: NextRequest, lang: string) {
  const { pathname, origin, search } = request.nextUrl;
  const newUrl = new URL(`/${lang}${pathname}${search}`, origin);
  const response = NextResponse.redirect(newUrl);
  response.cookies.set(COOKIE_NAME, lang, { path: '/', maxAge: COOKIE_AGE });
  return response;
}

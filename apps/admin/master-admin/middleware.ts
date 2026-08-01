import {
  getPreferredLang,
  middlewareContainer,
  redirectWithLang,
  stripLocalePrefix,
} from '@Src/shared/libs/middleware';
import { COOKIE_AGE, COOKIE_NAME, supportedLocales } from '@Src/shared/libs/middleware/middleware-constants';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  if (!request.url) {
    return NextResponse.next();
  }

  const lang = getPreferredLang(request);
  const currentLangInPath = request.nextUrl.pathname.split('/')[1];

  // 언어 prefix가 없다면 redirect
  if (!supportedLocales.includes(currentLangInPath)) {
    return redirectWithLang(request, lang);
  }

  // 언어 prefix는 있으므로 쿠키 저장
  const response = NextResponse.next();
  response.cookies.set(COOKIE_NAME, lang, { path: '/', maxAge: COOKIE_AGE });

  // 라우트 매칭용 prefix 제거
  const routePath = stripLocalePrefix(request.nextUrl.pathname);

  // 체인 실행
  const chain = middlewareContainer.resolveByPath(routePath);
  if (!chain) {
    return response;
  }

  const finalResponse = await chain.execute(request);
  finalResponse.cookies.set(COOKIE_NAME, lang, {
    path: '/',
    maxAge: COOKIE_AGE,
  });

  return finalResponse;
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};

import { supportedLocales } from '@FsdShared/config/i18n/auto-gen/constants/i18n-locales';
import { proxyContainer } from '@FsdShared/config/proxy/proxy.setup';
import { stripPathPrefix } from '@Libs/proxy-container';
import { NextRequest, NextResponse } from 'next/server';

export async function proxy(request: NextRequest) {
  if (!request.url) {
    return NextResponse.next();
  }

  request.cookies.set('test', 'test');

  // 라우트 매칭용 prefix 제거
  const routePath = stripPathPrefix(request.nextUrl.pathname, supportedLocales);

  // 체인 실행
  const chain = proxyContainer.resolveByPath(routePath);

  if (!chain) {
    return NextResponse.next();
  }

  return await chain.execute(request);
}

export const config = {
  matcher: [
    '/((?!api|mock|_next/static|_next/image|favicon.ico|serviceWorker|mockServiceWorker|.*\\.png$|.*\\.svg$).*)',
  ],
};

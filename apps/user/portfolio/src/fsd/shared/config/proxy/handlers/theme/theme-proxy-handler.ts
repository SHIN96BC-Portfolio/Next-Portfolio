import { createCustomPublicProxyCookie } from '@FsdShared/config/cookie/cookie-public.setup';
import { COOKIE_DEFAULT_AGE, COOKIE_THEME_NAME } from '@FsdShared/config/cookie/model';
import { ThemeType } from '@FsdShared/config/theme/model/type';
import { NextHandler, Proxy } from '@Libs/proxy-container';
import { NextRequest, NextResponse } from 'next/server';

/**
 * 테마 설정을 위한 핸들러
 */
const themeMiddleHandler: Proxy = async (req: NextRequest, next: NextHandler) => {
  const { pathname } = req.nextUrl;

  // 기존 쿠키 확인
  const cookieReqJar = createCustomPublicProxyCookie(req);
  let theme = cookieReqJar.get(COOKIE_THEME_NAME) as ThemeType | undefined;

  // light/dark 외 값이 들어온 경우 정리
  if (theme !== 'light' && theme !== 'dark') {
    theme = undefined;
  }

  // 쿠키가 없으면 사용자 힌트 기반으로 세팅
  if (!theme) {
    const hint = req.headers.get('sec-ch-prefers-color-scheme'); // 'dark' | 'light' | null
    const resolved: ThemeType = hint === 'dark' ? 'dark' : 'light';

    const res = NextResponse.next();
    const cookieJar = createCustomPublicProxyCookie(res);

    cookieJar.set(COOKIE_THEME_NAME, resolved, {
      path: '/',
      maxAge: COOKIE_DEFAULT_AGE, // 30일
      sameSite: 'lax',
    });

    // 선택: UA에 색상 체계 힌트 제공 (폼/스크롤바 등)
    res.headers.set('Color-Scheme', resolved);

    return res;
  }

  // 체인을 계속 실행
  return next(req);
};

export default themeMiddleHandler;

import { createCustomPublicProxyCookie } from '@FsdShared/config/cookie/cookie-public.setup';
import { COOKIE_DEFAULT_AGE, COOKIE_THEME_NAME } from '@FsdShared/config/cookie/model';
import { isThemeType, THEME_TYPE, ThemeType } from '@FsdShared/config/theme/model/type';
import { NextHandler, Proxy } from '@core/proxy-container';
import { NextRequest, NextResponse } from 'next/server';

/**
 * 테마 쿠키 초기화 proxy 핸들러.
 *
 * - 최초 방문 등 테마 쿠키가 없으면 `sec-ch-prefers-color-scheme` 힌트로 light/dark를 정합니다.
 * - 잘못된 쿠키 값은 무시하고 다시 초기화합니다.
 */
const themeMiddleHandler: Proxy = async (req: NextRequest, next: NextHandler) => {
  const cookieReqJar = createCustomPublicProxyCookie(req);
  let theme = cookieReqJar.get(COOKIE_THEME_NAME) as ThemeType | undefined;

  if (!isThemeType(theme)) {
    theme = undefined;
  }

  if (!theme) {
    const hint = req.headers.get('sec-ch-prefers-color-scheme');
    const resolved: ThemeType = hint === THEME_TYPE.DARK ? THEME_TYPE.DARK : THEME_TYPE.LIGHT;

    const res = NextResponse.next();
    const cookieJar = createCustomPublicProxyCookie(res);

    cookieJar.set(COOKIE_THEME_NAME, resolved, {
      path: '/',
      maxAge: COOKIE_DEFAULT_AGE,
      sameSite: 'lax',
    });

    // 브라우저 기본 UI(폼·스크롤바 등)에 색상 체계 힌트 전달
    res.headers.set('Color-Scheme', resolved);

    return res;
  }

  return next(req);
};

export default themeMiddleHandler;

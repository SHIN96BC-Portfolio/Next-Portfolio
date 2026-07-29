import { createCustomPublicProxyCookie } from '@FsdShared/config/cookie/cookie-public.setup';
import { COOKIE_DEFAULT_AGE, COOKIE_LANG_NAME } from '@FsdShared/config/cookie/model';
import { supportedLocales } from '@FsdShared/config/i18n/auto-gen/constants/i18n-locales';
import getPreferredLang from '@FsdShared/config/proxy/utils/get-preferred-lang';
import { NextHandler, Proxy } from '@Libs/proxy-container';
import { NextRequest, NextResponse } from 'next/server';

/**
 * 다국어 설정을 위한 핸들러
 */
const localeMiddleHandler: Proxy = async (req: NextRequest, next: NextHandler) => {
  const currentLangInPath = req.nextUrl.pathname.split('/')[1];

  // locale prefix 가 없다면 locale 을 붙여서 redirect
  if (!supportedLocales.includes(currentLangInPath)) {
    const { pathname, origin, search } = req.nextUrl;
    const lang = getPreferredLang(req);

    const newUrl = new URL(`/${lang}${pathname}${search}`, origin);
    const response = NextResponse.redirect(newUrl);

    const cookieJar = createCustomPublicProxyCookie(response);

    cookieJar.set(COOKIE_LANG_NAME, lang, { path: '/', maxAge: COOKIE_DEFAULT_AGE });

    return response;
  }

  // locale 이 존재하면 체인을 계속 실행
  return next(req);
};

export default localeMiddleHandler;

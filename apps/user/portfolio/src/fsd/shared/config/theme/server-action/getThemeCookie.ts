'use server';

import { createCustomPublicNextServerCookie } from '@FsdShared/config/cookie/cookie-public.setup';
import { COOKIE_THEME_NAME } from '@FsdShared/config/cookie/model';
import { resolveThemeType } from '@FsdShared/config/theme/model/type';

/** 서버 layout 등에서 현재 테마 쿠키를 읽습니다. */
export default async function getThemeCookie() {
  const customNextServerCookie = await createCustomPublicNextServerCookie();
  return resolveThemeType(customNextServerCookie.get(COOKIE_THEME_NAME));
}

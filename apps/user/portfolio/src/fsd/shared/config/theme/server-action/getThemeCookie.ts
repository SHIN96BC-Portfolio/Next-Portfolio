'use server';

import { createCustomPublicNextServerCookie } from '@FsdShared/config/cookie/cookie-public.setup';
import { COOKIE_THEME_NAME } from '@FsdShared/config/cookie/model';
import { ThemeType } from '@FsdShared/config/theme/model/type';

export default async function getThemeCookie() {
  const customNextServerCookie = await createCustomPublicNextServerCookie();
  return (customNextServerCookie.get(COOKIE_THEME_NAME) || 'light') as ThemeType;
}

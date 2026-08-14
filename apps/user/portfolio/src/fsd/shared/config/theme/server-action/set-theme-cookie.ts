'use server';

import { createCustomPublicNextServerCookie } from '@FsdShared/config/cookie/cookie-public.setup';
import { COOKIE_DEFAULT_AGE, COOKIE_THEME_NAME } from '@FsdShared/config/cookie/model';
import { ThemeType } from '@FsdShared/config/theme/model/theme';
import { revalidatePath } from 'next/cache';

/**
 * 테마 쿠키를 저장하고 해당 경로를 revalidate합니다.
 * Client의 `ThemeToggle`에서 server action으로 호출됩니다.
 */
export default async function setThemeCookie(theme: ThemeType, path = '/') {
  const customNextServerCookie = await createCustomPublicNextServerCookie();
  customNextServerCookie.set(COOKIE_THEME_NAME, theme, { path: '/', maxAge: COOKIE_DEFAULT_AGE, sameSite: 'lax' });
  revalidatePath(path);
}

'use server';

import { createCustomPublicNextServerCookie } from '@FsdShared/config/cookie/cookie-public.setup';
import { COOKIE_DEFAULT_AGE, COOKIE_THEME_NAME } from '@FsdShared/config/cookie/model';
import { revalidatePath } from 'next/cache';

export default async function setThemeCookie(theme: 'light' | 'dark', path = '/') {
  const customNextServerCookie = await createCustomPublicNextServerCookie();
  customNextServerCookie.set(COOKIE_THEME_NAME, theme, { path: '/', maxAge: COOKIE_DEFAULT_AGE, sameSite: 'lax' });
  revalidatePath(path);
}

'use server';
import { createCustomPublicNextServerCookie } from '@FsdShared/config/cookie/cookie-public.setup';
import { COOKIE_LANG_NAME } from '@FsdShared/config/cookie/model';
import { Locale } from '@FsdShared/config/i18n';
import { defaultLocale } from '@FsdShared/config/proxy/model';

export default async function getLangCookie() {
  const customNextServerCookie = await createCustomPublicNextServerCookie();

  return (customNextServerCookie.get(COOKIE_LANG_NAME) || defaultLocale) as Locale;
}

'use server';

import { createCustomPublicNextServerCookie } from '@FsdShared/config/cookie/cookie-public.setup';
import { COOKIE_LANG_NAME } from '@FsdShared/config/cookie/model';
import { resolveLocale } from '@FsdShared/config/i18n/client';

/** Server Action·SSR에서 언어 쿠키를 읽습니다. 없으면 기본 locale을 반환합니다. */
export default async function getLangCookie() {
  const customNextServerCookie = await createCustomPublicNextServerCookie();

  return resolveLocale(customNextServerCookie.get(COOKIE_LANG_NAME));
}

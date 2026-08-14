/**
 * 서버 전용 번역 로더.
 *
 * - `server-only`이므로 Client Component에서 import하면 빌드 에러가 납니다.
 * - Server Component에서 `@FsdShared/config/i18n/utils/get-i18n-translator`로 직접 import하세요.
 * - Client `useI18n`용 전체 preload는 `get-i18n-dictionaries`를 사용하세요.
 */
import 'server-only';
import { DictionaryNamespaceMap } from '@FsdShared/config/i18n/i18n.type';
import getI18nDictionary from '@FsdShared/config/i18n/utils/get-i18n-dictionary';
import type { Locale } from '../auto-gen/constants/i18n-locales';
import type { Namespace } from '../auto-gen/constants/i18n-namespaces';

/**
 * 주어진 locale에 맞는 번역 사전을 불러옵니다.
 *
 * - `server-only` 모듈이므로 Server Component에서만 사용하세요.
 * - Client Component에서는 layout에서 `getI18nDictionaries`로 preload한 뒤 `I18nProvider`에 넘깁니다.
 *
 * @param locale 언어 코드 (예: `ko`, `en`, `ja`)
 * @param namespace 사전 namespace (예: `home`, `common`)
 */
export default async function getI18nTranslator<N extends Namespace>(
  locale: Locale,
  namespace: N
): Promise<{ dict: DictionaryNamespaceMap[N] }> {
  const dict = await getI18nDictionary(locale, namespace);
  return { dict: dict as DictionaryNamespaceMap[N] };
}

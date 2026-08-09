/**
 * locale·namespace에 해당하는 번역 JSON을 동적 import로 불러옵니다.
 * `getI18nTranslator` 내부에서만 사용합니다.
 */
import 'server-only';
import dictionaries from '@FsdShared/config/i18n/dictionaries';
import type { Locale } from '../auto-gen/constants/i18n-locales';
import type { Namespace } from '../auto-gen/constants/i18n-namespaces';

/**
 * locale·namespace에 해당하는 번역 JSON을 동적 import로 불러옵니다.
 *
 * @param locale 언어 코드 (예: `ko`, `en`, `ja`)
 * @param namespace JSON 파일명 (예: `common`, `home`)
 */
export default async function getI18nDictionary(locale: Locale, namespace: Namespace) {
  const localeDictionaries = dictionaries[locale];
  if (!localeDictionaries) {
    throw new Error(`Locale '${locale}' not supported`);
  }

  const loadNamespace = localeDictionaries[namespace];
  if (!loadNamespace) {
    throw new Error(`Namespace '${namespace}' not found for locale '${locale}'`);
  }

  return loadNamespace();
}

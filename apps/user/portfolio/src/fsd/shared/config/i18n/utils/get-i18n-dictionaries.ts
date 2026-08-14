/**
 * 서버에서 locale의 전체 namespace 사전을 preload합니다.
 * `I18nProvider`의 `dictionaries` prop에 전달해 Client `useI18n`이 동작하게 합니다.
 */
import 'server-only';
import type { Locale } from '@FsdShared/config/i18n/auto-gen/constants/i18n-locales';
import { I18N_DICTIONARY_NAMESPACE } from '@FsdShared/config/i18n/auto-gen/constants/i18n-namespaces';
import type { DictionaryNamespaceMap } from '@FsdShared/config/i18n/i18n.type';
import getI18nTranslator from '@FsdShared/config/i18n/utils/get-i18n-translator';

/**
 * @param locale 언어 코드
 * @returns namespace → dictionary 맵 (Client Provider용)
 */
export default async function getI18nDictionaries(locale: Locale): Promise<DictionaryNamespaceMap> {
  const [{ dict: common }, { dict: home }] = await Promise.all([
    getI18nTranslator(locale, I18N_DICTIONARY_NAMESPACE.COMMON),
    getI18nTranslator(locale, I18N_DICTIONARY_NAMESPACE.HOME),
  ]);

  return { common, home };
}

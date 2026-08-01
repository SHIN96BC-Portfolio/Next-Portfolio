import { Locale, Namespace } from '@Src/shared/libs/i18n';
import dictionaries from '@Src/shared/libs/i18n/dictionaries';

/**
 * locale과 namespace에 해당하는 번역 메시지 JSON을 동적으로 불러옵니다.
 *
 * @param locale 언어 코드 (예: 'ko', 'en')
 * @param namespace JSON 파일명 (예: 'common', 'main')
 * @returns 해당 메시지 객체 (Promise<Record<string, string>>)
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

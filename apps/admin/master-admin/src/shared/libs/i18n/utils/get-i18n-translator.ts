import 'server-only';
import { Locale, Namespace } from '@Src/shared/libs/i18n';
import { DictionaryNamespaceMap } from '@Src/shared/libs/i18n/i18n-type';
import getI18nDictionary from '@Src/shared/libs/i18n/utils/get-i18n-dictionary';

/**
 * 주어진 locale에 맞는 번역 메시지를 불러오고,
 * 번역 함수 t(key)를 반환합니다.
 *
 * 제네릭 N을 사용해서 namespace 에 따라 정확한 dictionary 타입으로 반환
 *
 * 서버 컴포넌트에서 직접 호출하여 사용합니다.
 *
 * @param locale 언어 코드 (예: 'ko', 'en')
 * @param namespace 지원하는 페이지(예: 'main', 'common')
 * @returns 번역 함수 t(key: string): string
 */
export default async function getI18nTranslator<N extends Namespace>(
  locale: Locale,
  namespace: N
): Promise<{ dict: DictionaryNamespaceMap[N] }> {
  const dict = await getI18nDictionary(locale, namespace);
  return { dict: dict as DictionaryNamespaceMap[N] };
}

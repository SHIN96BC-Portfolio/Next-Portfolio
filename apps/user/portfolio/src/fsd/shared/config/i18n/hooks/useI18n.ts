import I18nContext from '@FsdApp/i18n/contexts/I18nContext';
import { getI18nDictionary, Namespace } from '@FsdShared/config/i18n';
import { DictionaryNamespaceMap } from '@FsdShared/config/i18n/i18n.type';
import { useContext, useEffect, useState } from 'react';

const useI18nContext = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('I18nContext not found');
  }
  return context;
};

/**
 * 제네릭 N을 사용해서 namespace 에 따라 정확한 dictionary 타입으로 반환하는 훅
 * 이렇게 하면 사용하는 곳에서 useI18n('main') 으로 사용하면
 * 타입은 자동으로 DictionaryNamespaceMap['main']으로 타입 추론
 * @param namespace
 */
const useI18n = <N extends Namespace>(namespace: N): { dict: DictionaryNamespaceMap[N] } => {
  // 현재 설정된 locale
  const { locale } = useI18nContext();

  // namespace 에 맞는 dictionary 타입을 세팅
  const [dict, setDict] = useState<DictionaryNamespaceMap[N] | null>(null);

  useEffect(() => {
    if (!locale) {
      return;
    }
    getI18nDictionary(locale, namespace).then((dictionary) => {
      setDict(dictionary as DictionaryNamespaceMap[N]);
    });
  }, [locale, namespace]);

  return { dict: dict ? dict : ({} as DictionaryNamespaceMap[N]) };
};

export default useI18n;

import I18nContext from '@FsdApp/i18n/contexts/I18nContext';
import { Namespace } from '@FsdShared/config/i18n';
import { DictionaryNamespaceMap } from '@FsdShared/config/i18n/i18n.type';
import { useContext } from 'react';

const useI18nContext = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('I18nContext not found');
  }
  return context;
};

/**
 * 서버에서 미리 로드한 dictionary를 I18nContext에서 읽는 훅.
 * 클라이언트에서 JSON을 직접 import하지 않도록 dictionaries.ts는 server-only입니다.
 * 사용 전 I18nProvider에 dictionaries를 넘겨주세요.
 */
const useI18n = <N extends Namespace>(namespace: N): { dict: DictionaryNamespaceMap[N] } => {
  const { dictionaries } = useI18nContext();
  const dict = dictionaries?.[namespace];

  if (!dict) {
    throw new Error(
      `Dictionary for namespace '${namespace}' is not preloaded. Load it on the server with getI18nTranslator and pass it to I18nProvider.`
    );
  }

  return { dict: dict as DictionaryNamespaceMap[N] };
};

export default useI18n;

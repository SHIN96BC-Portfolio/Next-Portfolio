import { Locale } from '@FsdShared/config/i18n';
import { DictionaryNamespaceMap } from '@FsdShared/config/i18n/i18n.type';
import { createContext } from 'react';

type I18nContextType = {
  locale: Locale;
  dictionaries?: Partial<DictionaryNamespaceMap>;
};

const I18nContext = createContext<I18nContextType | null>(null);

export default I18nContext;

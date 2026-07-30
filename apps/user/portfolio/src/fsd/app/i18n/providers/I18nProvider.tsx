'use client';

import I18nContext from '@FsdApp/i18n/contexts/I18nContext';
import { Locale } from '@FsdShared/config/i18n';
import { DictionaryNamespaceMap } from '@FsdShared/config/i18n/i18n.type';

interface Props {
  locale: Locale;
  dictionaries?: Partial<DictionaryNamespaceMap>;
  children: React.ReactNode;
}

export default function I18nProvider({ locale, dictionaries, children }: Props) {
  return <I18nContext.Provider value={{ locale, dictionaries }}>{children}</I18nContext.Provider>;
}

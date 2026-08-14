'use client';

import { Locale } from '@FsdShared/config/i18n/client';
import I18nContext from '@FsdShared/config/i18n/contexts/I18nContext';
import { DictionaryNamespaceMap } from '@FsdShared/config/i18n/i18n.type';

interface Props {
  locale: Locale;
  dictionaries?: Partial<DictionaryNamespaceMap>;
  children: React.ReactNode;
}

export default function I18nProvider({ locale, dictionaries, children }: Props) {
  return <I18nContext.Provider value={{ locale, dictionaries }}>{children}</I18nContext.Provider>;
}

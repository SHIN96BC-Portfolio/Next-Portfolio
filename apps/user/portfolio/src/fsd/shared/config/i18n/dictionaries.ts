import 'server-only';
import { DictionaryCommon } from '@FsdShared/config/i18n/auto-gen/types/common';
import { DictionaryHome } from '@FsdShared/config/i18n/auto-gen/types/home';

const dictionaries = {
  en: {
    common: () =>
      import('@FsdShared/config/i18n/locales/en/common.json').then((module): DictionaryCommon => module.default),
    home: () => import('@FsdShared/config/i18n/locales/en/home.json').then((module): DictionaryHome => module.default),
  },
  ko: {
    common: () =>
      import('@FsdShared/config/i18n/locales/ko/common.json').then((module): DictionaryCommon => module.default),
    home: () => import('@FsdShared/config/i18n/locales/ko/home.json').then((module): DictionaryHome => module.default),
  },
  ja: {
    common: () =>
      import('@FsdShared/config/i18n/locales/ja/common.json').then((module): DictionaryCommon => module.default),
    home: () => import('@FsdShared/config/i18n/locales/ja/home.json').then((module): DictionaryHome => module.default),
  },
} as const;

export default dictionaries;

import 'server-only';
import { DictionaryCommon } from '@Src/shared/libs/i18n/types/common';
import { DictionaryMain } from '@Src/shared/libs/i18n/types/main';

const dictionaries = {
  en: {
    common: () =>
      import('@Src/shared/libs/i18n/locales/en/common.json').then((module): DictionaryCommon => module.default),
    main: () => import('@Src/shared/libs/i18n/locales/en/main.json').then((module): DictionaryMain => module.default),
  },
  ko: {
    common: () =>
      import('@Src/shared/libs/i18n/locales/ko/common.json').then((module): DictionaryCommon => module.default),
    main: () => import('@Src/shared/libs/i18n/locales/ko/main.json').then((module): DictionaryMain => module.default),
  },
} as const;

export default dictionaries;

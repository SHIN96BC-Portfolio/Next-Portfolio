import type { Locale } from '@FsdShared/config/i18n/auto-gen/constants/i18n-locales';

/** API wire — `GET /site/gnb` query */
export interface GnbGetReq {
  lang?: Locale;
}

export interface GnbGetRes {
  id: number;
  name: string;
  path: string;
  icon?: string;
  children?: GnbGetRes[];
}

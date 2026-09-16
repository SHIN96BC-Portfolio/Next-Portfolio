import { I18N_LOCALE, type Locale } from '@FsdShared/config/i18n/auto-gen/constants/i18n-locales';
import { SiteGnb } from '../client/gnb';
import { portfolioNavigationEn } from './portfolio-navigation.en';
import { portfolioNavigationJa } from './portfolio-navigation.ja';
import { portfolioNavigationKo } from './portfolio-navigation.ko';

const portfolioNavigationByLang: Record<Locale, SiteGnb[]> = {
  [I18N_LOCALE.KO]: portfolioNavigationKo,
  [I18N_LOCALE.EN]: portfolioNavigationEn,
  [I18N_LOCALE.JA]: portfolioNavigationJa,
};

export function getPortfolioNavigationMock(lang: Locale): SiteGnb[] {
  return portfolioNavigationByLang[lang];
}

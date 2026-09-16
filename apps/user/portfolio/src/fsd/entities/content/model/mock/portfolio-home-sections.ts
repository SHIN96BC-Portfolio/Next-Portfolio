import { I18N_LOCALE, type Locale } from '@FsdShared/config/i18n/auto-gen/constants/i18n-locales';
import { HomeSectionGetRes } from '..';
import { portfolioHomeSectionsEn } from './portfolio-home-sections.en';
import { portfolioHomeSectionsJa } from './portfolio-home-sections.ja';
import { portfolioHomeSectionsKo } from './portfolio-home-sections.ko';

const portfolioHomeSectionsByLang: Record<Locale, HomeSectionGetRes[]> = {
  [I18N_LOCALE.KO]: portfolioHomeSectionsKo,
  [I18N_LOCALE.EN]: portfolioHomeSectionsEn,
  [I18N_LOCALE.JA]: portfolioHomeSectionsJa,
};

export function getPortfolioHomeSectionsMock(lang: Locale): HomeSectionGetRes[] {
  return portfolioHomeSectionsByLang[lang];
}

/** @deprecated use getPortfolioHomeSectionsMock(lang) */
export const portfolioHomeSectionsMock = portfolioHomeSectionsKo;

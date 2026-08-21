import { HomeSectionGetRes } from '@FsdEntities/content/model';
import { portfolioHomeSectionsEn } from '@FsdEntities/content/model/mock/portfolio-home-sections.en';
import { portfolioHomeSectionsJa } from '@FsdEntities/content/model/mock/portfolio-home-sections.ja';
import { portfolioHomeSectionsKo } from '@FsdEntities/content/model/mock/portfolio-home-sections.ko';
import { I18N_LOCALE, type Locale } from '@FsdShared/config/i18n/auto-gen/constants/i18n-locales';

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

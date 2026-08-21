import { portfolioProjectsEn } from '@FsdEntities/content/model/mock/portfolio-projects.en';
import { portfolioProjectsJa } from '@FsdEntities/content/model/mock/portfolio-projects.ja';
import { portfolioProjectsKo } from '@FsdEntities/content/model/mock/portfolio-projects.ko';
import type { ProjectCompany } from '@FsdEntities/content/model/types/section-config';
import { I18N_LOCALE, type Locale } from '@FsdShared/config/i18n/auto-gen/constants/i18n-locales';

const portfolioProjectsByLang: Record<Locale, ProjectCompany[]> = {
  [I18N_LOCALE.KO]: portfolioProjectsKo,
  [I18N_LOCALE.EN]: portfolioProjectsEn,
  [I18N_LOCALE.JA]: portfolioProjectsJa,
};

export function getPortfolioProjectsMock(lang: Locale): ProjectCompany[] {
  return portfolioProjectsByLang[lang];
}

/** @deprecated use getPortfolioProjectsMock(lang) */
export const portfolioProjectsMock = portfolioProjectsKo;

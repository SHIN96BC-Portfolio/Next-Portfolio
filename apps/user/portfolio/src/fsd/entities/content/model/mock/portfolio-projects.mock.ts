import { I18N_LOCALE, type Locale } from '@FsdShared/config/i18n/auto-gen/constants/i18n-locales';
import type { ProjectCompany } from '../types/section-config';
import { portfolioProjectsEn } from './portfolio-projects.en';
import { portfolioProjectsJa } from './portfolio-projects.ja';
import { portfolioProjectsKo } from './portfolio-projects.ko';

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

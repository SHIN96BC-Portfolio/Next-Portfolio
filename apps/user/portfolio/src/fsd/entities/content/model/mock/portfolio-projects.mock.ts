import { portfolioProjectsEn } from '@FsdEntities/content/model/mock/portfolio-projects.en';
import { portfolioProjectsJa } from '@FsdEntities/content/model/mock/portfolio-projects.ja';
import { portfolioProjectsKo } from '@FsdEntities/content/model/mock/portfolio-projects.ko';
import { CONTENT_LANG, ContentLang, ProjectCompany } from '@FsdEntities/content/model/types';

const portfolioProjectsByLang: Record<ContentLang, ProjectCompany[]> = {
  [CONTENT_LANG.KO]: portfolioProjectsKo,
  [CONTENT_LANG.EN]: portfolioProjectsEn,
  [CONTENT_LANG.JA]: portfolioProjectsJa,
};

export function getPortfolioProjectsMock(lang: ContentLang): ProjectCompany[] {
  return portfolioProjectsByLang[lang];
}

/** @deprecated use getPortfolioProjectsMock(lang) */
export const portfolioProjectsMock = portfolioProjectsKo;

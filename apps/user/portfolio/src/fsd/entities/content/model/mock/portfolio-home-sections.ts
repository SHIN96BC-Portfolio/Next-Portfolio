import { portfolioHomeSectionsEn } from '@FsdEntities/content/model/mock/portfolio-home-sections.en';
import { portfolioHomeSectionsJa } from '@FsdEntities/content/model/mock/portfolio-home-sections.ja';
import { portfolioHomeSectionsKo } from '@FsdEntities/content/model/mock/portfolio-home-sections.ko';
import { CONTENT_LANG, ContentLang, HomeSectionRes } from '@FsdEntities/content/model/types';

const portfolioHomeSectionsByLang: Record<ContentLang, HomeSectionRes[]> = {
  [CONTENT_LANG.KO]: portfolioHomeSectionsKo,
  [CONTENT_LANG.EN]: portfolioHomeSectionsEn,
  [CONTENT_LANG.JA]: portfolioHomeSectionsJa,
};

export function getPortfolioHomeSectionsMock(lang: ContentLang): HomeSectionRes[] {
  return portfolioHomeSectionsByLang[lang];
}

/** @deprecated use getPortfolioHomeSectionsMock(lang) */
export const portfolioHomeSectionsMock = portfolioHomeSectionsKo;

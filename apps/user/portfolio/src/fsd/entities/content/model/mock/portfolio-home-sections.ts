import { CONTENT_LANG, ContentLang, HomeSectionGetRes } from '@FsdEntities/content/model';
import { portfolioHomeSectionsEn } from '@FsdEntities/content/model/mock/portfolio-home-sections.en';
import { portfolioHomeSectionsJa } from '@FsdEntities/content/model/mock/portfolio-home-sections.ja';
import { portfolioHomeSectionsKo } from '@FsdEntities/content/model/mock/portfolio-home-sections.ko';

const portfolioHomeSectionsByLang: Record<ContentLang, HomeSectionGetRes[]> = {
  [CONTENT_LANG.KO]: portfolioHomeSectionsKo,
  [CONTENT_LANG.EN]: portfolioHomeSectionsEn,
  [CONTENT_LANG.JA]: portfolioHomeSectionsJa,
};

export function getPortfolioHomeSectionsMock(lang: ContentLang): HomeSectionGetRes[] {
  return portfolioHomeSectionsByLang[lang];
}

/** @deprecated use getPortfolioHomeSectionsMock(lang) */
export const portfolioHomeSectionsMock = portfolioHomeSectionsKo;

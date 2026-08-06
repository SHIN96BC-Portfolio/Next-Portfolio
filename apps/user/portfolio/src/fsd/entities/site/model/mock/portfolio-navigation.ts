import { CONTENT_LANG, ContentLang } from '@FsdEntities/content/model/types';
import { SiteGnb } from '@FsdEntities/site/model/client/gnb';
import { portfolioNavigationEn } from '@FsdEntities/site/model/mock/portfolio-navigation.en';
import { portfolioNavigationJa } from '@FsdEntities/site/model/mock/portfolio-navigation.ja';
import { portfolioNavigationKo } from '@FsdEntities/site/model/mock/portfolio-navigation.ko';

const portfolioNavigationByLang: Record<ContentLang, SiteGnb[]> = {
  [CONTENT_LANG.KO]: portfolioNavigationKo,
  [CONTENT_LANG.EN]: portfolioNavigationEn,
  [CONTENT_LANG.JA]: portfolioNavigationJa,
};

export function getPortfolioNavigationMock(lang: ContentLang): SiteGnb[] {
  return portfolioNavigationByLang[lang];
}

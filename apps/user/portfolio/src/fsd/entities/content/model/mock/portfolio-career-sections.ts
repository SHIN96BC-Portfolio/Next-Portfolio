import { portfolioCareerSectionsEn } from '@FsdEntities/content/model/mock/portfolio-career-sections.en';
import { portfolioCareerSectionsJa } from '@FsdEntities/content/model/mock/portfolio-career-sections.ja';
import { portfolioCareerSectionsKo } from '@FsdEntities/content/model/mock/portfolio-career-sections.ko';
import { CONTENT_LANG, ContentLang, HomeSectionRes } from '@FsdEntities/content/model/types';

const portfolioCareerSectionsByLang: Record<ContentLang, HomeSectionRes[]> = {
  [CONTENT_LANG.KO]: portfolioCareerSectionsKo,
  [CONTENT_LANG.EN]: portfolioCareerSectionsEn,
  [CONTENT_LANG.JA]: portfolioCareerSectionsJa,
};

export function getPortfolioCareerSectionsMock(lang: ContentLang): HomeSectionRes[] {
  return portfolioCareerSectionsByLang[lang];
}

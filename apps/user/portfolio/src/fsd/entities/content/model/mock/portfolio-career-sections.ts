import { CONTENT_LANG, ContentLang, HomeSectionGetRes } from '@FsdEntities/content/model';
import { portfolioCareerSectionsEn } from '@FsdEntities/content/model/mock/portfolio-career-sections.en';
import { portfolioCareerSectionsJa } from '@FsdEntities/content/model/mock/portfolio-career-sections.ja';
import { portfolioCareerSectionsKo } from '@FsdEntities/content/model/mock/portfolio-career-sections.ko';

const portfolioCareerSectionsByLang: Record<ContentLang, HomeSectionGetRes[]> = {
  [CONTENT_LANG.KO]: portfolioCareerSectionsKo,
  [CONTENT_LANG.EN]: portfolioCareerSectionsEn,
  [CONTENT_LANG.JA]: portfolioCareerSectionsJa,
};

export function getPortfolioCareerSectionsMock(lang: ContentLang): HomeSectionGetRes[] {
  return portfolioCareerSectionsByLang[lang];
}

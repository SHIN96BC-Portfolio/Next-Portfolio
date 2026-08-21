import { HomeSectionGetRes } from '@FsdEntities/content/model';
import { portfolioCareerSectionsEn } from '@FsdEntities/content/model/mock/portfolio-career-sections.en';
import { portfolioCareerSectionsJa } from '@FsdEntities/content/model/mock/portfolio-career-sections.ja';
import { portfolioCareerSectionsKo } from '@FsdEntities/content/model/mock/portfolio-career-sections.ko';
import { I18N_LOCALE, type Locale } from '@FsdShared/config/i18n/auto-gen/constants/i18n-locales';

const portfolioCareerSectionsByLang: Record<Locale, HomeSectionGetRes[]> = {
  [I18N_LOCALE.KO]: portfolioCareerSectionsKo,
  [I18N_LOCALE.EN]: portfolioCareerSectionsEn,
  [I18N_LOCALE.JA]: portfolioCareerSectionsJa,
};

export function getPortfolioCareerSectionsMock(lang: Locale): HomeSectionGetRes[] {
  return portfolioCareerSectionsByLang[lang];
}

import { I18N_LOCALE, type Locale } from '@FsdShared/config/i18n/auto-gen/constants/i18n-locales';
import { HomeSectionGetRes } from '..';
import { portfolioCareerSectionsEn } from './portfolio-career-sections.en';
import { portfolioCareerSectionsJa } from './portfolio-career-sections.ja';
import { portfolioCareerSectionsKo } from './portfolio-career-sections.ko';

const portfolioCareerSectionsByLang: Record<Locale, HomeSectionGetRes[]> = {
  [I18N_LOCALE.KO]: portfolioCareerSectionsKo,
  [I18N_LOCALE.EN]: portfolioCareerSectionsEn,
  [I18N_LOCALE.JA]: portfolioCareerSectionsJa,
};

export function getPortfolioCareerSectionsMock(lang: Locale): HomeSectionGetRes[] {
  return portfolioCareerSectionsByLang[lang];
}

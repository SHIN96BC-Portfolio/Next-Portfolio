import {
  ContactConfig,
  ContentLang,
  EducationConfig,
  HeroConfig,
  HomeSectionRes,
  LicensesConfig,
  MarkdownConfig,
  ProjectGridConfig,
  SECTION_TYPE,
  SkillsConfig,
  TimelineConfig,
} from '@FsdEntities/content/model/types';
import { I18N_DICTIONARY_NAMESPACE } from '@FsdShared/config/i18n';
import getI18nTranslator from '@FsdShared/config/i18n/utils/get-i18n-translator';
import { DisplayVariant } from '@FsdShared/display/model/display-variant';
import PortfolioCareer from '@FsdWidgets/portfolio/career/ui/PortfolioCareer';
import PortfolioContact from '@FsdWidgets/portfolio/contact/ui/PortfolioContact';
import PortfolioEducation from '@FsdWidgets/portfolio/education/ui/PortfolioEducation';
import PortfolioHero from '@FsdWidgets/portfolio/hero/ui/PortfolioHero';
import PortfolioLicenses from '@FsdWidgets/portfolio/licenses/ui/PortfolioLicenses';
import PortfolioMarkdownSection from '@FsdWidgets/portfolio/markdown/ui/PortfolioMarkdownSection';
import PortfolioProjects from '@FsdWidgets/portfolio/projects/ui/PortfolioProjects';
import PortfolioSkills from '@FsdWidgets/portfolio/skills/ui/PortfolioSkills';
import fetchHomeSectionsSSR from '@NextApp/_actions/fetchHomeSectionsSSR';

type PortfolioHomePageProps = {
  lang: ContentLang;
  displayVariant?: DisplayVariant;
};

export default async function PortfolioHomePage({ lang, displayVariant = 'screen' }: PortfolioHomePageProps) {
  const [sections, { dict: homeDict }] = await Promise.all([
    fetchHomeSectionsSSR(lang),
    getI18nTranslator(lang, I18N_DICTIONARY_NAMESPACE.HOME),
  ]);

  return (
    <div
      className={
        displayVariant === 'print'
          ? 'print-document print-document--home font-[family-name:var(--font-geist-sans)]'
          : 'font-[family-name:var(--font-geist-sans)]'
      }
    >
      <PortfolioSectionRenderer
        sections={sections}
        lang={lang}
        resumeLinkLabel={homeDict.resume.viewDetail}
        displayVariant={displayVariant}
      />
    </div>
  );
}

function PortfolioSectionRenderer({
  sections,
  lang,
  resumeLinkLabel,
  displayVariant,
}: {
  sections: HomeSectionRes[];
  lang: ContentLang;
  resumeLinkLabel: string;
  displayVariant: DisplayVariant;
}) {
  const activeSections = [...sections].filter((s) => s.isActive).sort((a, b) => a.displayOrder - b.displayOrder);

  return (
    <>
      {activeSections.map((section) => {
        switch (section.sectionType) {
          case SECTION_TYPE.HERO:
            return (
              <PortfolioHero key={section.id} config={section.config as HeroConfig} displayVariant={displayVariant} />
            );

          case SECTION_TYPE.MARKDOWN:
            return (
              <PortfolioMarkdownSection
                key={section.id}
                id={section.sectionKey}
                title={section.title ?? section.sectionKey}
                config={section.config as MarkdownConfig}
                variant={section.sectionKey === 'about' ? 'slide-left' : 'fade-up'}
                alternate={section.sectionKey === 'about'}
                displayVariant={displayVariant}
              />
            );

          case SECTION_TYPE.PROJECT_GRID:
            return (
              <PortfolioProjects
                key={section.id}
                title={section.title ?? 'Projects'}
                config={section.config as ProjectGridConfig}
                lang={lang}
                displayVariant={displayVariant}
              />
            );

          case SECTION_TYPE.TIMELINE:
            return (
              <PortfolioCareer
                key={section.id}
                title={section.title ?? 'Career'}
                config={section.config as TimelineConfig}
                lang={lang}
                resumeLinkLabel={resumeLinkLabel}
                displayVariant={displayVariant}
              />
            );

          case SECTION_TYPE.CUSTOM:
            return renderCustomSection(section, displayVariant);

          default:
            return null;
        }
      })}
    </>
  );
}

function renderCustomSection(section: HomeSectionRes, displayVariant: DisplayVariant) {
  switch (section.sectionKey) {
    case 'skills':
      return (
        <PortfolioSkills
          key={section.id}
          title={section.title ?? 'Skills'}
          config={section.config as SkillsConfig}
          displayVariant={displayVariant}
        />
      );
    case 'licenses':
      return (
        <PortfolioLicenses
          key={section.id}
          title={section.title ?? 'Licenses'}
          config={section.config as LicensesConfig}
          displayVariant={displayVariant}
        />
      );
    case 'education':
      return (
        <PortfolioEducation
          key={section.id}
          title={section.title ?? 'Education'}
          config={section.config as EducationConfig}
          displayVariant={displayVariant}
        />
      );
    case 'contact':
      return (
        <PortfolioContact
          key={section.id}
          title={section.title ?? 'Contact'}
          config={section.config as ContactConfig}
          displayVariant={displayVariant}
        />
      );
    default:
      return null;
  }
}

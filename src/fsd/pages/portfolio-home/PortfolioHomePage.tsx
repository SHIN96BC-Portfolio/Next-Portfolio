import {
  ContactConfig,
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
import PortfolioCareer from '@FsdWidgets/portfolio/career/ui/PortfolioCareer';
import PortfolioContact from '@FsdWidgets/portfolio/contact/ui/PortfolioContact';
import PortfolioEducation from '@FsdWidgets/portfolio/education/ui/PortfolioEducation';
import PortfolioHero from '@FsdWidgets/portfolio/hero/ui/PortfolioHero';
import PortfolioLicenses from '@FsdWidgets/portfolio/licenses/ui/PortfolioLicenses';
import PortfolioMarkdownSection from '@FsdWidgets/portfolio/markdown/ui/PortfolioMarkdownSection';
import PortfolioProjects from '@FsdWidgets/portfolio/projects/ui/PortfolioProjects';
import PortfolioSkills from '@FsdWidgets/portfolio/skills/ui/PortfolioSkills';
import fetchHomeSectionsSSR from '@NextApp/_actions/fetchHomeSectionsSSR';

export default async function PortfolioHomePage() {
  const sections = await fetchHomeSectionsSSR();

  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <PortfolioSectionRenderer sections={sections} />
    </div>
  );
}

function PortfolioSectionRenderer({ sections }: { sections: HomeSectionRes[] }) {
  const activeSections = [...sections].filter((s) => s.isActive).sort((a, b) => a.displayOrder - b.displayOrder);

  return (
    <>
      {activeSections.map((section) => {
        switch (section.sectionType) {
          case SECTION_TYPE.HERO:
            return <PortfolioHero key={section.id} config={section.config as HeroConfig} />;

          case SECTION_TYPE.MARKDOWN:
            return (
              <PortfolioMarkdownSection
                key={section.id}
                id={section.sectionKey}
                title={section.title ?? section.sectionKey}
                config={section.config as MarkdownConfig}
                variant={section.sectionKey === 'about' ? 'slide-left' : 'fade-up'}
                alternate={section.sectionKey === 'about'}
              />
            );

          case SECTION_TYPE.PROJECT_GRID:
            return (
              <PortfolioProjects
                key={section.id}
                title={section.title ?? 'Projects'}
                config={section.config as ProjectGridConfig}
              />
            );

          case SECTION_TYPE.TIMELINE:
            return (
              <PortfolioCareer
                key={section.id}
                title={section.title ?? 'Career'}
                config={section.config as TimelineConfig}
              />
            );

          case SECTION_TYPE.CUSTOM:
            return renderCustomSection(section);

          default:
            return null;
        }
      })}
    </>
  );
}

function renderCustomSection(section: HomeSectionRes) {
  switch (section.sectionKey) {
    case 'skills':
      return (
        <PortfolioSkills key={section.id} title={section.title ?? 'Skills'} config={section.config as SkillsConfig} />
      );
    case 'licenses':
      return (
        <PortfolioLicenses
          key={section.id}
          title={section.title ?? 'Licenses'}
          config={section.config as LicensesConfig}
        />
      );
    case 'education':
      return (
        <PortfolioEducation
          key={section.id}
          title={section.title ?? 'Education'}
          config={section.config as EducationConfig}
        />
      );
    case 'contact':
      return (
        <PortfolioContact
          key={section.id}
          title={section.title ?? 'Contact'}
          config={section.config as ContactConfig}
        />
      );
    default:
      return null;
  }
}

import { HomeSectionRes, PAGE_KEY, ResumeProjectConfig, SECTION_TYPE } from '@FsdEntities/content/model/types';

export const CAREER_PROJECT_IDS = [
  'a1000001-0000-4000-8000-000000000002',
  'a1000001-0000-4000-8000-000000000003',
  'a1000001-0000-4000-8000-000000000004',
  'a1000001-0000-4000-8000-000000000005',
] as const;

const CAREER_INTRO_SECTION_ID = 'a1000001-0000-4000-8000-000000000001';
const CAREER_STRENGTHS_SECTION_ID = 'a1000001-0000-4000-8000-000000000006';

function createResumeProjectSection(project: ResumeProjectConfig, displayOrder: number, id: string): HomeSectionRes {
  return {
    id,
    pageKey: PAGE_KEY.CAREER,
    sectionKey: `project-${project.projectId}`,
    sectionType: SECTION_TYPE.RESUME_PROJECT,
    title: project.title,
    configSchemaVersion: 1,
    displayOrder,
    isActive: true,
    config: project,
  };
}

export function createPortfolioCareerSections(options: {
  introTitle: string;
  introBody: string;
  strengthsTitle: string;
  strengthsBody: string;
  projects: ResumeProjectConfig[];
}): HomeSectionRes[] {
  const { introTitle, introBody, strengthsTitle, strengthsBody, projects } = options;

  return [
    {
      id: CAREER_INTRO_SECTION_ID,
      pageKey: PAGE_KEY.CAREER,
      sectionKey: 'intro',
      sectionType: SECTION_TYPE.MARKDOWN,
      title: introTitle,
      configSchemaVersion: 1,
      displayOrder: 0,
      isActive: true,
      config: { body: introBody },
    },
    ...projects.map((project, index) => createResumeProjectSection(project, index + 1, CAREER_PROJECT_IDS[index])),
    {
      id: CAREER_STRENGTHS_SECTION_ID,
      pageKey: PAGE_KEY.CAREER,
      sectionKey: 'strengths',
      sectionType: SECTION_TYPE.MARKDOWN,
      title: strengthsTitle,
      configSchemaVersion: 1,
      displayOrder: projects.length + 1,
      isActive: true,
      config: { body: strengthsBody },
    },
  ];
}

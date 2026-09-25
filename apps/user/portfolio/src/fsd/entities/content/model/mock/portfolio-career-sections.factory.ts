import { HomeSectionGetRes, PAGE_KEY, ResumeEmployer, ResumeProjectConfig, SECTION_TYPE } from '..';

/** 앞 4개는 BE 시드(V1__init.sql)와 같은 id. ...006 은 강점 요약 섹션이 사용 */
export const CAREER_PROJECT_IDS = [
  'a1000001-0000-4000-8000-000000000002',
  'a1000001-0000-4000-8000-000000000003',
  'a1000001-0000-4000-8000-000000000004',
  'a1000001-0000-4000-8000-000000000005',
  'a1000001-0000-4000-8000-000000000007',
  'a1000001-0000-4000-8000-000000000008',
  'a1000001-0000-4000-8000-000000000009',
  'a1000001-0000-4000-8000-000000000010',
  'a1000001-0000-4000-8000-000000000011',
  'a1000001-0000-4000-8000-000000000012',
  'a1000001-0000-4000-8000-000000000013',
  'a1000001-0000-4000-8000-000000000014',
] as const;

const CAREER_INTRO_SECTION_ID = 'a1000001-0000-4000-8000-000000000001';
const CAREER_STRENGTHS_SECTION_ID = 'a1000001-0000-4000-8000-000000000006';

function createResumeProjectSection(project: ResumeProjectConfig, displayOrder: number, id: string): HomeSectionGetRes {
  return {
    id,
    pageKey: PAGE_KEY.CAREER,
    sectionKey: `project-${project.projectId}`,
    sectionType: SECTION_TYPE.RESUME_PROJECT,
    title: project.title,
    configSchemaVersion: project.cases || project.overview ? 2 : 1,
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
  /** 소속 회사명 → 회사 헤더 정보. 같은 회사 프로젝트에 공통 주입 */
  employers?: Record<string, ResumeEmployer>;
}): HomeSectionGetRes[] {
  const { introTitle, introBody, strengthsTitle, strengthsBody, projects, employers } = options;

  if (projects.length > CAREER_PROJECT_IDS.length) {
    throw new Error(`CAREER_PROJECT_IDS 부족: 프로젝트 ${projects.length}개, id ${CAREER_PROJECT_IDS.length}개`);
  }

  const projectsWithEmployer = projects.map((project) => {
    const employer = employers?.[project.company];
    return employer ? { ...project, employer } : project;
  });

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
    ...projectsWithEmployer.map((project, index) =>
      createResumeProjectSection(project, index + 1, CAREER_PROJECT_IDS[index])
    ),
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

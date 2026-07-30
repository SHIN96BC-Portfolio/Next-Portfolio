import { getPortfolioProjectsMock } from '@FsdEntities/content/model/mock/portfolio-projects.mock';
import { portfolioSkillsMock } from '@FsdEntities/content/model/mock/portfolio-skills.mock';
import { CONTENT_LANG, HomeSectionRes, PAGE_KEY, SECTION_TYPE } from '@FsdEntities/content/model/types';

export const portfolioHomeSectionsKo: HomeSectionRes[] = [
  {
    id: 'sec-hero',
    pageKey: PAGE_KEY.HOME,
    sectionKey: 'hero',
    sectionType: SECTION_TYPE.HERO,
    title: null,
    configSchemaVersion: 1,
    displayOrder: 0,
    isActive: true,
    config: {
      name: '신병철',
      title: '5년차 Frontend Developer',
      tagline: '끊임없이 질문하며 더 나은 방향을 찾는 개발자',
      links: [
        { type: 'github', label: 'GitHub', url: 'https://github.com/SHIN96BC' },
        { type: 'email', label: 'Email', url: 'mailto:mousecjf@gmail.com' },
        {
          type: 'portfolio',
          label: 'GitHub Portfolio Source',
          url: 'https://github.com/orgs/SHIN96BC-Portfolio/repositories',
        },
      ],
    },
  },
  {
    id: 'sec-intro',
    pageKey: PAGE_KEY.HOME,
    sectionKey: 'introduction',
    sectionType: SECTION_TYPE.MARKDOWN,
    title: 'Introduction',
    configSchemaVersion: 1,
    displayOrder: 1,
    isActive: true,
    config: {
      body: `5년차 웹 개발자로, **Next.js 기반 프론트엔드 개발**을 전문으로 하고 있습니다.

SI, 스타트업, 여행·항공, B2C/B2B 플랫폼 등 다양한 환경에서 웹 서비스를 구축·운영하며, 프론트엔드뿐 아니라 **Java API 개발**, **AWS·Azure 인프라 설계·배포**, **CI/CD 자동화**까지 경험했습니다.

신규 서비스를 제로베이스부터 개발하거나, 레거시 구조 개선 및 차세대 서비스 구축을 모두 수행했으며, 엔드투엔드 관점에서 제품을 완성하는 풀스택 역량을 갖추고 있습니다.

코드 리뷰, 테스트 자동화, 설계 검증을 통해 서비스 품질을 높이고, **AI 기반 개발 워크플로우**를 업무에 적극 활용하여 정확성과 생산성을 동시에 추구합니다.`,
    },
  },
  {
    id: 'sec-about',
    pageKey: PAGE_KEY.HOME,
    sectionKey: 'about',
    sectionType: SECTION_TYPE.MARKDOWN,
    title: 'About Me',
    configSchemaVersion: 1,
    displayOrder: 2,
    isActive: true,
    config: {
      body: `저는 **끊임없이 질문하며 더 나은 방향을 찾는 개발자**입니다.

SI, 스타트업, 플랫폼 회사 등 다양한 환경에서 웹 서비스를 개발하며 기획 참여, 구조 설계, DB 설계, Frontend/Backend 개발, 배포 자동화까지 적은 인원으로 최대한의 비즈니스 가치를 만들어내는 방식으로 일해왔습니다.

개발자는 단순히 기능을 만드는 직무가 아니라고 생각합니다. 사용자 경험을 최적화하고, 서비스가 성장할 수 있도록 문제를 예측·차단하며, 필요하다면 개발 외적인 일도 자발적으로 해결하는 것이 진짜 실력이라 믿습니다.

혼자보다 함께할 때 더 큰 성과를 만든다고 생각하여 기획·디자인·CS 등 다양한 직무와 적극적으로 커뮤니케이션하며 일했습니다.

AI 시대에는 코드를 얼마나 많이 작성했는지보다, **문제를 얼마나 정확하게 정의하고 AI를 통해 빠르게 가치를 만들어내는지**가 더 중요하다고 믿습니다. 서비스 전체 구조, 비즈니스 흐름, 문제의 본질을 이해하는 역량이 필수적이며, 저는 문제를 깊게 분석하고 리스크를 사전에 파악하며 정확한 질문을 던지는 습관을 꾸준히 만들어가고 있습니다.`,
    },
  },
  {
    id: 'sec-projects',
    pageKey: PAGE_KEY.HOME,
    sectionKey: 'project-grid',
    sectionType: SECTION_TYPE.PROJECT_GRID,
    title: 'Work Projects',
    configSchemaVersion: 1,
    displayOrder: 3,
    isActive: true,
    config: {
      companies: getPortfolioProjectsMock(CONTENT_LANG.KO),
    },
  },
  {
    id: 'sec-career',
    pageKey: PAGE_KEY.HOME,
    sectionKey: 'career',
    sectionType: SECTION_TYPE.TIMELINE,
    title: 'Career',
    configSchemaVersion: 1,
    displayOrder: 4,
    isActive: true,
    config: {
      items: [
        {
          id: 'career-yrism',
          company: '(주) YRISM',
          period: '2024.08 – 재직중',
          location: '한국',
          department: '개발팀',
          position: '매니저',
          role: 'Frontend Developer',
          description: '모두투어 서비스 차세대 개발 및 운영',
          isDevRole: true,
        },
        {
          id: 'career-pinetechsoft',
          company: '(주) Pinetechsoft',
          period: '2023.10 – 2024.05 (8개월)',
          location: '한국',
          department: '개발3팀',
          position: '연구원',
          role: 'Frontend Developer',
          description: '자사 플랫폼 서비스(Lahat, Zootopia) 개발 및 운영',
          isDevRole: true,
        },
        {
          id: 'career-er',
          company: '(주) ER Solution',
          period: '2022.07 – 2023.09 (1년 3개월)',
          location: '한국',
          department: '개발1팀',
          position: '연구원',
          role: 'Full Stack Developer',
          description: 'Web Application SI 개발 (프론트엔드·백엔드)',
          isDevRole: true,
        },
        {
          id: 'career-education-prep',
          company: '한국소프트웨어인재개발원',
          period: '2021.11 – 2022.04',
          location: '한국',
          department: 'Java 풀스택 과정',
          position: '수료',
          role: 'Developer Trainee',
          description: 'Java 기반 풀스택 Web 개발자 양성과정 (6개월) — 개발자 전환',
          isDevRole: true,
        },
      ],
    },
  },
  {
    id: 'sec-skills',
    pageKey: PAGE_KEY.HOME,
    sectionKey: 'skills',
    sectionType: SECTION_TYPE.CUSTOM,
    title: 'Skills',
    configSchemaVersion: 1,
    displayOrder: 5,
    isActive: true,
    config: portfolioSkillsMock,
  },
  {
    id: 'sec-licenses',
    pageKey: PAGE_KEY.HOME,
    sectionKey: 'licenses',
    sectionType: SECTION_TYPE.CUSTOM,
    title: 'Licenses & Certificates',
    configSchemaVersion: 1,
    displayOrder: 6,
    isActive: true,
    config: {
      items: [
        { name: '정보처리기사', date: '2024.09.10' },
        { name: '정보처리산업기사', date: '2021.11.26' },
        { name: '일본어능력시험 (JLPT) N1', date: '2021.01.13' },
      ],
    },
  },
  {
    id: 'sec-education',
    pageKey: PAGE_KEY.HOME,
    sectionKey: 'education',
    sectionType: SECTION_TYPE.CUSTOM,
    title: 'Education',
    configSchemaVersion: 1,
    displayOrder: 7,
    isActive: true,
    config: {
      items: [
        {
          school: '한국방송통신대학교',
          period: '2023.09 – 재학중',
          location: '한국',
          details: ['컴퓨터과학과', '3학년 편입'],
        },
        {
          school: '한국소프트웨어인재개발원',
          period: '2021.11 – 2022.04',
          location: '한국',
          details: ['Java 기반 풀스택 Web 개발자 양성과정 (6개월)', '모든 팀 프로젝트 팀장', '특모범상·봉사상 수상'],
        },
        {
          school: 'TOHO GAKUEN Media Training College',
          period: '2019.04 – 2021.03',
          location: '일본',
          details: ['방송음향과 졸업', '성적 우수 장학금 수상'],
        },
      ],
    },
  },
  {
    id: 'sec-contact',
    pageKey: PAGE_KEY.HOME,
    sectionKey: 'contact',
    sectionType: SECTION_TYPE.CUSTOM,
    title: 'Contact',
    configSchemaVersion: 1,
    displayOrder: 8,
    isActive: true,
    config: {
      email: 'mousecjf@gmail.com',
      message: '프로젝트 협업, 채용 관련 문의를 환영합니다.',
      links: [
        { type: 'github', label: 'GitHub', url: 'https://github.com/SHIN96BC' },
        { type: 'email', label: 'Email', url: 'mailto:mousecjf@gmail.com' },
        {
          type: 'portfolio',
          label: 'GitHub Portfolio Source',
          url: 'https://github.com/orgs/SHIN96BC-Portfolio/repositories',
        },
      ],
    },
  },
];

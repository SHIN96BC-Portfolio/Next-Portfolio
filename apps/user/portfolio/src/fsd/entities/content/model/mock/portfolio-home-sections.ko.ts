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

개발자는 단순히 기능을 만드는 직무가 아니라고 생각합니다. 사용자 경험을 최적화하고, 서비스가 성장할 수 있도록 문제를 예측·차단하며, 필요하다면 개발 외적인 일도 자발적으로 해결하는 것이 진짜 실력이라 믿습니다.

혼자보다 함께할 때 더 큰 성과를 만든다고 생각하여 기획·디자인·CS 등 다양한 직무와 적극적으로 커뮤니케이션하며 일했습니다.

AI 시대에는 코드를 얼마나 많이 작성했는지보다, **문제를 얼마나 정확하게 정의하고 AI를 통해 빠르게 가치를 만들어내는지**가 더 중요하다고 믿습니다. 서비스 전체 구조, 비즈니스 흐름, 문제의 본질을 이해하는 역량이 필수적이며, 저는 문제를 깊게 분석하고 리스크를 사전에 파악하며 정확한 질문을 던지는 습관을 꾸준히 만들어가고 있습니다.`,
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
      body: `## 핵심 역량

· **대규모 리팩터링·아키텍처 전환** — 레거시 서비스를 무중단으로 차세대 구조로 재구축한 경험 (Next.js 메이저 버전업, 모노레포 전환, 상태관리 마이그레이션)

· **성능 최적화** — 대용량 데이터 조회·렌더링 병목을 구조적으로 진단하고 수십 배 단위로 개선

· **풀스택·인프라 대응** — 프론트엔드 주력, Java/Spring·Nest.js 백엔드부터 CI/CD 파이프라인·K8s 인프라 재설계까지 배포·운영 전에 대한 경험

· **기획부터 배포까지 End-to-End** — 기획 참여·구조 설계·DB 설계·프론트/백엔드 개발·배포 자동화까지, 소수 인원으로 제품을 엔드투엔드로 완성한 경험

## 대표 성과

· **300개 이상 BP/ONBP 사이트를 단일 Turborepo 모노레포로 통합** — 원소스 멀티사이트 구조를 설계해 단일 코드베이스로 300개 이상 사이트를 운영·배포 (yarn→pnpm 전환, 사이트별 빌드 파이프라인 구성)

· **결제·라우팅 등 critical 버그로 불안정하던 레거시 서비스를 안정화** — 300건 이상의 이슈를 처리하며 결제 실패·비정상 라우팅 등 핵심 장애를 해소, 서비스 신뢰성 대폭 개선

· **1.4억 건 대용량 테이블 조회 4~6분 → 5초 이내 (약 50배+ 개선)** — 인덱스·통계 테이블 설계로 조회 병목 해소

· **CI/CD 파이프라인·K8s 인프라 재설계 참여** — 멀티서비스(B2C·BP·ONBP) 배포 파이프라인을 서비스·환경별로 세분화하여 재설계, Azure Local ARC 전환·DR 페일오버 구성에 기여. 빌드~배포 30분+ → 12~15분 단축, 페이지 로딩 최대 15초 → 5초 (SSG/SSR 조합·캐싱·useEffect 정리)

· **Next.js 12→15 메이저 버전업 주도** — App Router·React 19 대응을 포함한 점진적 마이그레이션을 서비스 무중단으로 수행

· **AI 개발 워크플로우를 팀 표준으로 정립** — Cursor Agent 규칙, Claude Code·Gemini CLI 가이드를 도입해 팀 공통 작업 방식·온보딩을 문서화`,
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
          period: '2023.10 – 2024.05',
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
          period: '2022.07 – 2023.09',
          location: '한국',
          department: '개발1팀',
          position: '연구원',
          role: 'Full Stack Developer',
          description: 'Web Application SI 개발 (프론트엔드·백엔드)',
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

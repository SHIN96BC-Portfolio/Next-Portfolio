import { I18N_LOCALE } from '@FsdShared/config/i18n/auto-gen/constants/i18n-locales';
import { HomeSectionGetRes, PAGE_KEY, SECTION_TYPE } from '..';
import { getPortfolioProjectsMock } from './portfolio-projects.mock';
import { portfolioSkillsMock } from './portfolio-skills.mock';

export const portfolioHomeSectionsKo: HomeSectionGetRes[] = [
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
      body: `5년차 프론트엔드 개발자입니다. **Next.js 기반 웹 서비스**를 전문으로 하며, SI·스타트업·여행 플랫폼 등 다양한 환경에서 신규 구축과 레거시 차세대 전환을 모두 수행했습니다.

현재 모두투어 B2C/B2B 플랫폼에서 as-is 운영과 차세대 재구축을 병행하며, 약 300개 BP/ONBP 사이트를 단일 Turborepo 모노레포로 운영하는 **멀티테넌트 구조**를 설계·구현했습니다. Next.js 12→15 메이저 버전업과 상태관리 전환을 서비스 무중단으로 완료했고, **FE 배포 파이프라인·Helm 차트 설계**부터 **AI 코딩 에이전트가 모노레포 아키텍처 경계를 지키도록 하는 컨텍스트 체계**까지 직접 구축해 팀 표준으로 운영 중입니다.

프론트엔드를 주력으로 하되 Java/Spring·Nest.js 백엔드, DB 설계, AWS·Azure 인프라까지 다루며 제품을 End-to-End로 완성해왔습니다. 기능 구현에 그치지 않고 **구조적 병목을 찾아 해결하는 것**을 강점으로 생각합니다.`,
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

· **풀스택·인프라 대응** — 프론트엔드 주력, Java/Spring·Nest.js 백엔드부터 FE 배포 파이프라인·Helm 차트 설계까지 배포·운영 전반에 대한 경험

· **기획부터 배포까지 End-to-End** — 기획 참여·구조 설계·DB 설계·프론트/백엔드 개발·배포 자동화까지, 소수 인원으로 제품을 엔드투엔드로 완성한 경험

## 대표 성과

· **300개+ 멀티테넌트 사이트를 단일 모노레포로 통합** — 공통 기반 BP 약 150개 + 대리점별 풀커스텀 ONBP 약 150개(지속 증가)를 단일 Turborepo 코드베이스에서 운영·배포

· **결제·라우팅 등 critical 버그로 불안정하던 레거시 서비스를 안정화** — 300건 이상의 이슈를 처리하며 결제 실패·비정상 라우팅 등 핵심 장애를 해소, 서비스 신뢰성 대폭 개선

· **1.4억 건 대용량 테이블 조회 4~6분 → 5초 이내 (약 50배+ 개선)** — 인덱스·통계 테이블 설계로 조회 병목 해소

· **FE 배포 파이프라인·Helm 차트 직접 설계·구축** — 멀티서비스(B2C·BP·ONBP) × 4환경 20개+ 파이프라인 체계로 재설계, Helm 고도화(HPA·readinessProbe·노드 분산). Azure Local ARC 전환·DR 페일오버는 인프라팀과 협업. 빌드~배포 30분+ → 12~15분 단축

· **주요 페이지 로딩 약 1/3 수준으로 단축** — SSG/SSR 조합·TanStack Query 캐싱·불필요 useEffect 정리 (Lighthouse 모바일 기준)

· **Next.js 12→15 메이저 버전업 주도** — App Router·React 19 대응을 포함한 점진적 마이그레이션을 서비스 무중단으로 수행

· **테스트·품질 체계 구축** — Vitest 기반 단위·통합 테스트와 원격 배포 환경 대상 Playwright E2E를 구성하고, 실행·리포트용 Testbed를 직접 제작. Husky 품질 게이트로 공통화·메이저 버전업 과정의 회귀 차단

· **AI 코딩 에이전트 컨텍스트 체계 구축** — 모노레포 아키텍처 경계(API 계약·어댑터·HTTP 레이어 분리, B2C↔ONBP 격리)를 AGENTS.md와 path-scoped Rule로 인코딩해 에이전트가 레이어를 침범하지 않도록 가드레일 구성. Cursor·Claude·Gemini·Codex 공통 컨텍스트로 표준화하고 E2E 실패 피드백을 후속 작업에 연결하는 루프 운영`,
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
      companies: getPortfolioProjectsMock(I18N_LOCALE.KO),
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
          department: '웹개발팀',
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
          department: '개발1팀',
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

import { ResumeProjectConfig } from '../types';

export const portfolioCareerProjectsKo: ResumeProjectConfig[] = [
  {
    projectId: 'modetour-nextgen',
    orderLabel: '1',
    title: '모두투어 B2C/B2B 여행 플랫폼 차세대 재구축',
    company: '(주) YRISM',
    period: '2024.08 ~ 재직중',
    role: '프론트엔드 개발',
    links: [
      { label: 'modetour.com', url: 'https://www.modetour.com' },
      { label: 'elpis.modetour.co.kr', url: 'https://elpis.modetour.co.kr' },
      { label: 'go.modetour.co.kr', url: 'https://go.modetour.co.kr' },
      { label: 'gentlemonster.modetour.com', url: 'https://gentlemonster.modetour.com' },
      { label: 'homeplus1.modetour.co.kr', url: 'https://homeplus1.modetour.co.kr' },
    ],
    problem:
      '운영 중인 as-is 서비스를 유지하면서, 동시에 차세대 프론트엔드를 전면 재구축해야 하는 과제. 인수 시점의 서비스는 결제·뒤로가기(라우팅) 등 핵심 기능이 정상 동작하지 않을 만큼 버그가 많고 불안정한 상태였음. 또한 코드 구조상 props 드릴링이 심하고 공통화가 되어 있지 않아, 동일 컴포넌트가 페이지마다 중복 존재해 한 번 수정할 때 여러 파일을 반복 수정해야 했고 디버깅에도 많은 시간이 소요됨. 운영 대상도 한 종류가 아니었음. B2C 본 사이트, 기능 기반은 B2C와 같고 취급 상품·일부 커스텀만 다른 BP 약 150개, 대리점 요구대로 화면·기능이 전부 달라지는 풀커스텀 ONBP 약 150개(지금도 계속 증가) — 성격이 다른 세 종류를 모두 PC·MO로 함께 관리해야 했음. APP도 웹뷰 기반이라 화면·기능은 FE 관리 영역이지만 앱 셸은 외부 업체가 관리해, 이슈가 생기면 원인이 웹뷰인지 앱인지부터 가려야 했음. 한정된 인원으로 이 전부를 같은 방식으로 운영하는 것은 불가능했음. 공통 컴포넌트 통합과 메이저 버전업을 병행해야 하는 상황에서, 변경이 어느 사이트에 영향을 주는지 확인할 수단이 없다는 것도 문제였음. AI 코딩 도구를 팀에서 쓰기 시작하면서, 구조를 모르는 상태에서 생성된 코드가 레이어 경계를 넘는 사례도 늘고 있었음.',
    workSections: [
      {
        title: '1) 서비스 안정화 (레거시 버그 대응)',
        items: [
          '추가 개발건과 결제 실패·비정상 라우팅 등 critical 버그를 포함해 **300건 이상의 이슈를 처리**하며 서비스를 정상 궤도로 안정화',
          '정상 동작하지 않던 핵심 플로우를 하나씩 진단·수정해 서비스 신뢰성 확보',
        ],
      },
      {
        title: '2) 아키텍처·구조 개선',
        items: [
          '**원소스 멀티사이트 구조 설계** — 도메인별 사이트 정보를 로드하고 API 헤더에 사이트 컨텍스트를 주입해, B2C와 기능 기반을 공유하는 BP 약 150개를 단일 코드베이스로 운영',
          '**Turborepo 모노레포 전환** — 커스텀 범위가 예측 불가능한 ONBP 약 150개(지속 증가)를 공통 컴포넌트 분리 + 사이트별 빌드 파이프라인으로 통합 관리, 도메인별 config 분리, yarn→pnpm 전환',
          '**공통 컴포넌트화 + props 드릴링 해소** — 페이지마다 중복되던 컴포넌트를 공통 컴포넌트로 통합. 동일 수정 시 4개 파일 → 1개 파일로 작업 범위를 줄여 유지보수·디버깅 시간을 단축하고 사이드 이펙트와 휴먼 에러 발생 지점 감소',
          '**FSD 아키텍처 도입**, FE Model + Mapper 패턴으로 BE API 변경 영향도 최소화',
        ],
      },
      {
        title: '3) 성능 최적화',
        items: [
          '**페이지 로딩 최적화** — SSG/SSR을 상황에 맞게 조합하고 TanStack Query 캐싱으로 불필요한 API 중복 호출·중복 로딩 제거, 불필요하게 반복 실행되던 useEffect 정리. 로딩이 가장 오래 걸리던 페이지 기준 약 1/3 수준으로 단축 (Lighthouse 모바일 기준)',
          '**빌드~배포 시간 단축** — 기존 파이프라인의 비효율을 진단·제거. 설정만 되어 있고 실제로는 동작하지 않고 빌드 시간만 늘어나게 만드는 불필요한 코드들을 제거. Next.js 12→15 버전업 과정에서 남아 있던 Babel 설정이 SWC 컴파일 경로를 비활성화하고 있던 것을 발견해 제거, 빌드와 dev 서버 기동 시간을 단축. 잘못 설정되어 정상적으로 동작하지 않던 캐시 설정을 Turborepo·Next 빌드 캐시를 도입하여 정상 적용하고, 불필요한 체크 스텝과 중복 실행되던 `yarn install`을 제거. 빌드 큐·캐시를 정비해 빌드~배포 30분+ → 12~15분 (약 50~60% 단축)',
        ],
      },
      {
        title: '4) UI·기술 부채 개선',
        items: [
          '**자체 UI 라이브러리 구축** — 무리하게 적용된 antd로 인한 CSS 애니메이션 버벅임을 해소하기 위해 antd를 점진 제거하고 모두투어 전용 UI 라이브러리 구축, react-print·react-date 등 문제 라이브러리 자체 구현·교체',
          '**Next.js 12→15 메이저 버전업** — App Router·React 19 대응 포함 점진적 마이그레이션을 서비스 무중단으로 수행',
          'RTK Query→TanStack Query·Redux→Zustand 무중단 점진 전환, 페이지별 중복 로직 공통화, 하드코딩 상수화',
        ],
      },
      {
        title: '5) 테스트·품질 체계',
        items: [
          '**단위·통합** — Vitest 3 멀티 프로젝트(도메인 패키지, B2C/ONBP 공통 패키지)와 React Testing Library로 HTTP 클라이언트, 암·복호화, 결제·예약 유틸, 커스텀 훅 등 비즈니스 로직을 검증. 패키지별로 테스트 프로젝트를 분리해 변경 영향 범위만 선택 실행 가능하도록 구성',
          '**E2E** — 별도 테스트 워크스페이스에서 Playwright로 운영 환경(legacy API)과 dev 환경(FE Server/BFF)을 시트·도메인(B2C·BP·ONBP PC/MO) 단위로 나눠 원격 배포 환경 대상 시나리오 실행. mock이 아닌 실 SSO 연동과 BFF probe로 실제 인증·응답 경로까지 검증하고, 시나리오 메타데이터 기반 실행·리포트용 Testbed UI를 직접 구축해 팀이 사용',
          '**품질 게이트** — Husky pre-commit에서 Biome + 변경 연관 Vitest, pre-push에서 빌드·타입체크·전체 테스트를 강제',
          '**API 계약** — OpenAPI 스펙에서 Zod/TypeBox를 생성해 타입 검증과 런타임 검증을 동일 소스로 연결, BE 스펙 변경 시 FE 영향 지점을 컴파일 타임에 노출',
          '다음 단계로 CI 테스트 게이트 도입과 페이지 단위 테스트 확대를 진행할 예정',
        ],
      },
      {
        title: '6) AI 개발 체계 — 에이전트 컨텍스트 엔지니어링',
        items: [
          '모노레포 규모가 커지면서 AI 코딩 에이전트가 레이어 경계를 넘거나 컨벤션을 벗어난 코드를 생성하는 문제가 반복됨. 도구를 늘리는 대신 **에이전트가 읽는 컨텍스트 자체를 설계**하는 방향을 선택',
          '**컨텍스트 단일 소스** — 루트 AGENTS.md를 단일 소스로 두고 Cursor·Claude·Gemini·Codex의 진입점을 여기에 맞춰, 도구가 달라도 동일한 경계·컨벤션을 따르도록 구성. 도구별로 규칙 문서가 분화되며 서로 어긋나는 문제를 차단',
          '**패키지 경계 주입** — 패키지별 AGENTS.md로 API 계약 정의·브라우저 어댑터·HTTP 통신 본체의 역할과 B2C ↔ ONBP 교차 import 금지를 작업 경로에 맞게 주입. 사람이 리뷰에서 잡던 아키텍처 위반을 생성 시점에 차단',
          '**컨벤션 가드레일** — 사람이 읽는 컨벤션 가이드와 에이전트가 읽는 Cursor Skill·path-scoped Rule을 분리. TS/TSX 편집 시에만 #region 구성·Named Export·Biome·이벤트 규칙을 주입해 불필요한 컨텍스트 소비를 줄이고, 레거시 일괄 리팩터는 적용 범위에서 명시적으로 제외해 의도치 않은 대규모 변경을 방지',
          '**E2E 피드백 루프** — Playwright 시나리오에 메타데이터를 부여해 registry를 자동 생성하고, sheet(legacy/fe-server)·domain 단위로 CLI 실행과 Testbed UI 실행을 모두 지원. 실패 원인·수정 옵션·재검증 절차를 문서로 산출해 후속 에이전트가 이어받도록 연결',
          '**온보딩** — 위 체계를 팀 공통 작업 방식으로 문서화해, 신규 인원이 프로젝트 구조를 파악하기 전에도 경계를 벗어나지 않고 작업할 수 있는 환경 구성',
        ],
      },
      {
        title: '7) 팀 생산성·협업',
        items: [
          '차세대 재구축을 FE 3명으로 시작해 현재 5명 규모가 된 팀에서, PL과 함께 아키텍처와 작업 기준을 설계했고 리드 부재 시 일정 조정·이슈 배분·기술 의사결정을 대행',
          '**기술 표준 수립** — FSD 아키텍처, FE Model + Mapper 패턴, 컴포넌트 공통화 기준, 브랜치·배포 규칙을 정의하고 문서화',
          '**배포 전략 전환 판단** — 구축기의 릴리스 트레인·통합 브랜치 방식이 오픈 후 잦은 핫픽스·긴급 배포 상황에 맞지 않는다고 판단해, 유연한 수동 배포 전략으로 전환 제안·적용',
        ],
      },
    ],
    outcomes: [
      '인수 시점 결제·라우팅 등 핵심 플로우가 동작하지 않던 서비스를, **이슈 300건+ 처리 후 운영 가능한 상태로 전환**',
      '사이트가 300개에서 계속 늘어나는 동안에도 **사이트 증가가 코드베이스·운영 비용 증가로 이어지지 않는 구조** 확보',
      '**배포 시간 약 50~60% 단축**, 주요 페이지 로딩 약 1/3 수준 (Lighthouse 모바일 기준)',
      '메이저 버전업·상태관리 전환을 **서비스 중단 없이** 완료해 안정성과 최신 기술 스택 동시 확보',
    ],
    extraSections: [
      {
        title: 'CI/CD·인프라 재설계',
        body: '차세대 전환에 맞춰 배포 파이프라인과 인프라를 재설계했습니다. FE 배포 파이프라인·Helm은 직접 수행하고, CDN·보안·Pod 운영은 인프라팀과 역할을 나눴습니다.',
        items: [
          '**직접 수행** — FE 배포 파이프라인 설계·구축(오케스트레이터 파이프라인으로 B2C 단일 8개 → B2C·BP·ONBP × 4환경 20개+ 체계로 분리, 원하는 서비스·환경만 선택 배포), Helm 차트 작성 및 고도화(topologySpreadConstraints, readinessProbe, CPU/메모리 기반 HPA), `kubectl rollout status` 기반 배포 검증, standby 파이프라인 신규 구성',
          '**빌드 방식 개선** — Docker 내부 빌드(Yarn workspaces)에서 Turbo prune + 호스트 pnpm/turbo 빌드 + Docker 패키징 분리 구조로 전환, buildx registry 캐시 도입',
          '**인프라팀 협업** — Azure AKS → Azure Local ARC(Connected K8s) 전환, failover(active/standby) 재해 복구 체계, Akamai CDN, 인프라 보안, Pod 운영·모니터링, 서버 로그 분석',
        ],
      },
    ],
    techStack: [
      'Next.js 12→15',
      'TypeScript',
      'Turborepo',
      'pnpm',
      'FSD',
      'TanStack Query',
      'Zustand',
      'Redux',
      'RTK Query',
      'axios',
      'Tailwind CSS',
      'Vitest',
      'React Testing Library',
      'Playwright',
      'Biome',
      'Husky',
      'Zod',
      'Azure DevOps',
      'ACR',
      'Helm',
      'Kubernetes',
      'Docker',
      'Git',
    ],
  },
  {
    projectId: 'uteas',
    orderLabel: '2',
    title: '미세먼지 배출량 조회·시각화 서비스 (UTEAS)',
    company: '(주) ER Solution',
    period: '2023.06 ~ 2023.07',
    role: '풀스택 개발 (FE·BE·DB 단독)',
    links: [],
    problem:
      '도로·지역·시간 단위 미세먼지 배출량을 조회·시각화하는 환경 모니터링 서비스 신규 개발. **1.4억 건 이상의 대용량 테이블** 조회에서 4~6분이 걸리는 심각한 성능 병목이 존재.',
    workSections: [
      {
        title: '한 일',
        items: [
          'FE·BE·DB 설계를 단독으로 수행',
          '**인덱스 최적화 및 통계 테이블 설계**로 대용량 조회 병목 구조적 해소',
          'Recharts 통계 시각화, v-world-map 지도, 엑셀 업로드 기능 구현',
          'Nest.js API·MariaDB 스키마 설계, AWS EC2 배포',
        ],
      },
    ],
    outcomes: [
      '**1.4억 건 조회 4~6분 → 5초 이내 (복잡 join 시 10초 이내, 약 50배 이상 개선)**',
      '프론트·백·인프라를 단독으로 완성해 End-to-End 개발 역량 입증',
    ],
    techStack: ['React(Vite)', 'Nest.js', 'TypeScript', 'MariaDB', 'TanStack Query', 'Docker', 'AWS EC2'],
  },
  {
    projectId: 'lhat',
    orderLabel: '3',
    title: '필리핀 Lahat 플랫폼 백오피스·웹앱 구축',
    company: '(주) Pinetechsoft',
    period: '2023.10 ~ 2024.05',
    role: '프론트엔드 개발',
    links: [],
    problem: '여러 도메인(Mall·Food·Store·동물병원)의 백오피스와 사용자 웹앱을 신규 구축·운영했습니다.',
    workSections: [
      {
        title: '주요 프로젝트',
        items: [
          '**Lahat Mall Admin** — 상품 판매 기능 추가에 따른 관리자 백오피스를 구조 설계부터 API 연동까지 단독 구축. Firebase 인증, 상품·옵션·카테고리·이벤트·주문·리뷰 관리, 무한스크롤 이벤트 상품 선택, i18n 적용',
          '**Lahat Food / Store Admin** — 기본·거리별 배달비 정책 기능 신규 추가, react-hook-form + Zod 폼 검증, 점주/고객 부담 비율 설정 UI 구현',
          '**Zootopia (동물병원)** — 예약 관리 Admin + 온라인 예약 웹앱 구축. 예약 생성·조회·취소, 펫 최대 10마리 관리, Email·SNS 통합 로그인(NextAuth), FCM 푸시 알림 연동, 소개 사이트까지 구축',
        ],
      },
    ],
    outcomes: [
      '구조 설계부터 배포까지 **단독 오너십**으로 다수 서비스 완성',
      '인증·결제·알림 등 핵심 도메인을 아우르는 백오피스·웹앱 개발 경험 축적',
    ],
    techStack: [
      'Next.js',
      'TypeScript',
      'Zustand/Jotai',
      'TanStack Query',
      'MUI',
      'Firebase',
      'AWS Amplify',
      'NextAuth',
      'Zod',
    ],
  },
  {
    projectId: 'er-platform',
    orderLabel: '4',
    title: '(주) ER Solution — 기타 플랫폼·공공 서비스 개발',
    company: '(주) ER Solution',
    period: '2022.07 ~ 2023.09',
    role: '풀스택 개발 연구원',
    links: [],
    problem: '프론트엔드 주력으로 풀스택·모바일까지 폭넓게 수행했습니다.',
    workSections: [
      {
        title: '주요 프로젝트',
        items: [
          '**Dada Pick / Dada Place** — B2B·B2C 유통관리 웹앱 및 B2C 쇼핑몰 신규 개발. 기획 단계 참여, 프론트엔드 단독 구축, Editor.js 상품 에디터·무한스크롤·Atomic Design 패턴 도입',
          '**전주경제운전 CMS** — 시내버스 경제운전 지표 관리 시스템. 권한 관리, Chart.js 운행 지표 시각화, Spring + eGovFrame API·MariaDB 설계·AWS 배포 (풀스택)',
          '**유진레미콘 입고관리** — 키오스크 송장 촬영 Android 앱. 외부 카메라 연동, 키오스크 UX, React 렌더링 최적화',
          '**반려견 순찰대** — 실시간 산책 기능 iOS 네이티브 앱 (Swift/SwiftUI), Naver Map 기반 실시간 경로·거리 표시',
          '**인천항보안공사** — 공식 사이트 유지보수, 웹접근성(WA) 인증심사 대응·통과, 모의해킹 보안 취약점 패치',
        ],
      },
    ],
    outcomes: [],
    techStack: [
      'React',
      'Next.js',
      'TypeScript',
      'Redux',
      'Java/Spring',
      'eGovFrame',
      'Nest.js',
      'React Native',
      'Swift',
      'MariaDB',
      'AWS',
    ],
  },
];

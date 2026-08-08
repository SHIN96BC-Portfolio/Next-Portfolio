import { ResumeProjectConfig } from '@FsdEntities/content/model/types';

export const portfolioCareerProjectsKo: ResumeProjectConfig[] = [
  {
    projectId: 'modetour-nextgen',
    orderLabel: '1',
    title: '모두투어 B2C/B2B 여행 플랫폼 차세대 재구축',
    company: '와이리즘',
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
      '운영 중인 as-is 서비스를 유지하면서, 동시에 차세대 프론트엔드를 전면 재구축해야 하는 과제. 인수 시점의 서비스는 결제·뒤로가기(라우팅) 등 핵심 기능이 정상 동작하지 않을 만큼 버그가 많고 불안정한 상태였음. 또한 코드 구조상 props 드릴링이 심하고 공통화가 되어 있지 않아, 동일 컴포넌트가 페이지마다 중복 존재해 한 번 수정할 때 여러 파일을 반복 수정해야 했고 디버깅에도 많은 시간이 소요됨. 한정된 인원으로 300개이상의 BP/ONBP 사이트를 효율적으로 운영할 구조도 필요했음.',
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
          '**원소스 멀티사이트 구조 설계** — 도메인별 사이트 정보를 로드하고 API 헤더에 사이트 컨텍스트를 주입해, 단일 코드베이스로 300개이상의 사이트를 운영하는 구조 구현',
          '**Turborepo 모노레포 전환** — 300개이상의 BP/ONBP 도메인 통합 관리, 도메인별 config 분리, yarn→pnpm 전환, 사이트별 빌드 파이프라인 구성',
          '**공통 컴포넌트화 + props 드릴링 해소** — 페이지마다 중복되던 컴포넌트를 공통 컴포넌트로 통합. 동일 수정 시 4개 파일 → 1개 파일로 작업 범위를 줄여 유지보수·디버깅 시간을 단축하고 사이드 이펙트와 휴먼 에러 발생 지점 감소',
          '**FSD 아키텍처 도입**, FE Model + Mapper 패턴으로 BE API 변경 영향도 최소화',
        ],
      },
      {
        title: '3) 성능 최적화',
        items: [
          '**페이지 로딩 최적화** — SSG/SSR을 상황에 맞게 조합하고 TanStack Query 캐싱으로 불필요한 API 중복 호출·중복 로딩 제거, 불필요하게 반복 실행되던 useEffect 정리. 로딩이 가장 오래 걸리던 페이지 기준 약 15초 → 5초 수준으로 단축',
          '**빌드~배포 시간 단축** — 기존 파이프라인의 비효율을 진단·제거. 설정만 되어 있고 실제로는 동작하지 않고 빌드 시간만 늘어나게 만드는 불필요한 코드들을 제거, 잘못 설정되어 정상적으로 동작하지 않던 캐시 설정을 Turborepo·Next 빌드 캐시를 도입하여 정상 적용하고, 불필요한 체크 스텝과 중복 실행되던 `yarn install`을 제거. 빌드 큐·캐시를 정비해 빌드~배포 30분+ → 12~15분 (약 50~60% 단축)',
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
        title: '5) 팀 생산성·협업',
        items: [
          '**AI 개발 워크플로우 팀 표준화** — Cursor Agent 규칙 및 Claude Code·Gemini CLI 가이드를 도입해 팀 공통 작업 방식과 온보딩 프로세스를 문서화',
        ],
      },
    ],
    outcomes: [
      '결제·라우팅 등 핵심 장애를 해소하고 **300건+ 이슈를 처리**해 불안정하던 레거시를 안정 궤도로 전환',
      '300개 이상의 사이트를 **단일 코드베이스·단일 모노레포**로 운영·배포하는 체계 확립',
      '**배포 시간 약 50~60% 단축**, 주요 페이지 로딩 대폭 개선으로 개발 생산성·사용자 경험 동시 향상',
      '메이저 버전업·상태관리 전환을 **서비스 중단 없이** 완료해 안정성과 최신 기술 스택 동시 확보',
    ],
    extraSections: [
      {
        title: 'CI/CD·인프라 재설계 (인프라팀과 협업)',
        body: '차세대 전환에 맞춰 배포 파이프라인과 인프라를 전면 재설계하는 작업에 참여했습니다.',
        items: [
          '**파이프라인 체계 재설계** — B2C 단일 서비스 기준 8개 파이프라인을, B2C·BP·ONBP × 4환경(dev/stg/prd/stby) 20개+ 체계로 분리. `pipeline-deploys.yml` 오케스트레이터를 통해 원하는 서비스·환경만 선택 배포하는 구조 구성',
          '**빌드 방식 개선** — Docker 내부 빌드(Yarn workspaces)에서 Turbo prune + 호스트 pnpm/turbo 빌드 + Docker 패키징 분리 구조로 전환, buildx registry 캐시 도입으로 빌드 시간 단축',
          '**배포 인프라 전환** — Azure AKS에서 Azure Local ARC(Connected K8s) 프록시 방식으로 전환, `kubectl rollout status` 기반 배포 검증 추가로 배포 안정성 확보',
          '**DR·페일오버 대응** — standby 파이프라인을 신규 구성해 failover(active/standby) 기반 재해 복구 체계 마련',
          '**Helm 차트 고도화** — topologySpreadConstraints(노드 분산), readinessProbe(`/api/health`), CPU/메모리 기반 HPA 오토스케일 적용',
          '**배포 전략 전환 판단** — 차세대 구축기의 릴리스 트레인·통합 브랜치 방식에서, 오픈 후 잦은 핫픽스·긴급 배포에 대응하기 위한 유연한 수동 배포 전략으로 전환',
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
    company: '이알솔루션',
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
      '**1.4억 건 조회 4~6분 → 5초 이내 (약 50배 이상 개선)**',
      '프론트·백·인프라를 단독으로 완성해 End-to-End 개발 역량 입증',
    ],
    techStack: ['React(Vite)', 'Nest.js', 'TypeScript', 'MariaDB', 'TanStack Query', 'Docker', 'AWS EC2'],
  },
  {
    projectId: 'lhat',
    orderLabel: '3',
    title: '필리핀 Lhat 플랫폼 백오피스·웹앱 구축',
    company: '파인테크소프트',
    period: '2023.11 ~ 2024.05',
    role: '프론트엔드 개발',
    links: [],
    problem: '여러 도메인(Mall·Food·Store·동물병원)의 백오피스와 사용자 웹앱을 신규 구축·운영했습니다.',
    workSections: [
      {
        title: '주요 프로젝트',
        items: [
          '**Lhat Mall Admin** — 상품 판매 기능 추가에 따른 관리자 백오피스를 구조 설계부터 API 연동까지 단독 구축. Firebase 인증, 상품·옵션·카테고리·이벤트·주문·리뷰 관리, 무한스크롤 이벤트 상품 선택, i18n 적용',
          '**Lhat Food / Store Admin** — 기본·거리별 배달비 정책 기능 신규 추가, react-hook-form + Zod 폼 검증, 점주/고객 부담 비율 설정 UI 구현',
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
    title: '다양한 플랫폼·공공 서비스 개발',
    company: '이알솔루션',
    period: '2022.07 ~ 2023.09',
    role: '풀스택 개발 연구원',
    links: [],
    problem: '프론트엔드 주력으로 풀스택·모바일까지 폭넓게 수행했습니다.',
    workSections: [
      {
        title: '주요 프로젝트',
        items: [
          '**DdaPick / DdaPlace** — B2B·B2C 유통관리 웹앱 및 B2C 쇼핑몰 신규 개발. 기획 단계 참여, 프론트엔드 단독 구축, Editor.js 상품 에디터·무한스크롤·Atomic Design 패턴 도입',
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

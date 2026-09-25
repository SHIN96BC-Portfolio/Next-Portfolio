import { ResumeEmployer, ResumeProjectConfig } from '../types';

export const portfolioCareerEmployersKo: Record<string, ResumeEmployer> = {
  '(주) YRISM': {
    period: '2024.08 – 재직중',
    detail: '웹개발팀 · 시스템 운영 매니저(사내 직급) · Frontend Developer',
  },
  '(주) Pinetechsoft': {
    period: '2023.10 – 2024.05',
    detail: '개발1팀 · 연구원 · Frontend Developer',
  },
  '(주) ER Solution': {
    period: '2022.07 – 2023.09',
    detail: '개발1팀 · 연구원 · Full Stack Developer',
  },
};

export const portfolioCareerProjectsKo: ResumeProjectConfig[] = [
  {
    projectId: 'travel-platform-nextgen',
    title: 'M사 B2C/B2B 여행 플랫폼 차세대 재구축',
    company: '(주) YRISM',
    period: '2024.08 – 재직중',
    role: '프론트엔드 개발',
    links: [],
    scopeTags: ['FE 3명 → 5명', 'PL과 아키텍처 공동 설계'],
    cases: [
      {
        title: '레거시 서비스 안정화',
        asIs: '인수 시점 결제·뒤로가기(라우팅) 등 핵심 플로우가 정상 동작하지 않을 만큼 불안정',
        approach: '정상 동작하지 않던 핵심 플로우를 하나씩 진단·수정하며 추가 개발 건과 병행 처리',
        toBe: '`이슈 400건+` 처리 · 결제 실패·비정상 라우팅 해소로 운영 가능한 상태로 전환',
      },
      {
        title: '차세대 핵심 도메인 재구축',
        asIs: 'as-is B2C/B2B 서비스를 운영하면서 PC·MO 핵심 도메인을 전면 재구축해야 하는 상황. as-is에 없던 보안 요구사항 존재',
        approach:
          '항공(Topas 연동 예약·조회·결제 플로우 재설계), 투어패스(Klook 연동, 탐색·옵션 선택·예약 UX 개선), 호텔(검색·필터·상세·예약 이관), 프로모션·할인조건·쿠폰(복잡한 할인 규칙을 FE에서 안정적으로 처리하는 구조), B2B 예약·관리 화면, 인증(로그인·세션·권한) 재설계. 암·복호화 모듈 신규 도입. 전환 기간 중 as-is B2C PC/MO 운영·추가 개발 병행',
        toBe: 'B2C·B2B PC/MO 핵심 도메인 차세대 전환 · 전환 기간에도 as-is 서비스 안정 운영 유지',
      },
      {
        title: '멀티테넌트 운영 구조 설계',
        asIs: 'B2C 본 사이트, 기능 기반은 같고 상품·일부 커스텀만 다른 BP 약 150개, 대리점별로 화면·기능이 전부 다른 풀커스텀 ONBP 약 150개(증가 중)를 모두 PC·MO로 한정된 인원이 운영. APP은 웹뷰 기반이라 화면·기능은 FE 영역이지만 앱 셸은 외부 업체가 관리해, 이슈마다 원인이 웹뷰인지 앱인지부터 판별',
        approach:
          'BP — 도메인별 init 시 사이트 정보를 로드하고 API 요청 헤더에 사이트 컨텍스트를 주입하는 원소스 멀티사이트. ONBP — Turborepo 모노레포에서 공통 컴포넌트 분리 + 사이트별 빌드 파이프라인으로 커스텀·공통 영역 격리, 도메인별 config로 커스텀 요소 체계화, yarn→pnpm 전환',
        toBe: '`300개+` 사이트를 단일 코드베이스로 운영 · 사이트가 늘어도 코드베이스·운영 비용이 따라 늘지 않는 구조',
      },
      {
        title: '코드 구조 개선 — 공통화·FSD·FE Model',
        asIs: 'props drilling이 심하고 동일 컴포넌트가 페이지마다 중복되어 한 번 수정에 여러 파일을 반복 수정, 디버깅 지연. 필터·예약·alert·popup 로직 산재, 하드코딩 문자열. BE API 스펙 변경에 FE가 과도하게 종속',
        approach:
          'FSD 아키텍처 도입. 중복 컴포넌트를 차세대 재구축과 병행해 점진 공통화, 산재 로직을 공통 모듈로 추출, 하드코딩 상수화. FE Model 레이어 + Mapper 패턴으로 BE API Model 직접 의존 제거',
        toBe: '동일 수정 `4파일 → 1파일` · BE 스펙 변경 영향을 도메인 단위로 격리 · 사이드이펙트·휴먼 에러 발생 지점 감소',
      },
      {
        title: 'UI 시스템 교체',
        asIs: '무리하게 적용된 antd의 글로벌 스타일 충돌로 UI 깨짐·CSS 애니메이션 버벅임. react-print는 대용량 페이지에서 인쇄 화면이 수십 초 지연, react-date는 버그 다발',
        approach:
          'antd를 점진 제거하고 전용 UI 라이브러리(Core UI) 구축, playground로 컴포넌트 단위 검증 환경 마련. iframe 기반 인쇄 자체 구현, react-day-picker로 교체',
        toBe: '디자인 일관성 확보·스타일 사이드이펙트 근본 해소 · 인쇄 지연(수십 초) 해소 · 날짜 선택 UX 안정화',
      },
      {
        title: 'Next.js 12→15·상태관리 무중단 전환',
        asIs: 'Next.js 12 + RTK Query·Redux 기반. 운영 중인 대규모 서비스라 일괄 전환 불가',
        approach:
          '도메인·페이지 단위 점진 마이그레이션(App Router·React 19 대응). RTK Query→TanStack Query, Redux→Zustand를 병행 운영하며 전환. 버전업 과정에서 남아 있던 Babel 설정이 SWC 컴파일 경로를 비활성화하고 있던 것을 발견해 제거',
        toBe: '서비스 중단 없이 메이저 버전업·상태관리 전환 완료 · Babel 제거로 빌드·dev 서버 기동 시간 단축',
      },
      {
        title: '배포 파이프라인·빌드 재설계',
        asIs: 'B2C 단일 8개 파이프라인 체계, 빌드~배포 30분 이상. 동작 없이 빌드 시간만 늘리는 설정, 잘못 설정된 캐시, 불필요한 체크 스텝·중복 `yarn install`. Docker 내부 빌드(Yarn workspaces)',
        approach:
          '*(직접)* 오케스트레이터 파이프라인으로 B2C·BP·ONBP × 4환경 20개+ 체계 분리·선택 배포, standby 파이프라인 신규 구성. Turbo prune + 호스트 pnpm/turbo 빌드 + Docker 패키징 분리, buildx registry 캐시, Turborepo·Next 빌드 캐시 정상화. Helm 차트 작성·고도화(topologySpreadConstraints, readinessProbe, CPU/메모리 HPA), `kubectl rollout status` 배포 검증. *(인프라팀 협업)* Azure AKS → Azure Local ARC 전환, active/standby failover 재해 복구, Akamai CDN, 인프라 보안, Pod 운영·모니터링, 서버 로그 분석',
        decision:
          '구축기의 릴리스 트레인·통합 브랜치 방식이 오픈 후 잦은 핫픽스·긴급 배포에 맞지 않는다고 보고, 유연한 수동 배포 전략으로 전환을 제안·적용',
        toBe: '빌드~배포 `30분+ → 12~15분` (약 50~60% 단축) · 파이프라인 `8개 → 20개+`로 서비스·환경 단위 선택 배포',
      },
      {
        title: '페이지 로딩 최적화',
        asIs: '불필요한 API 중복 호출·중복 로딩, 반복 실행되는 useEffect',
        approach: '페이지 성격에 맞춰 SSG/SSR 조합, TanStack Query 캐싱, 불필요한 useEffect 정리',
        toBe: '가장 느리던 페이지 로딩 `약 1/3` 수준 (Lighthouse 모바일 기준)',
      },
      {
        title: '테스트·품질 체계',
        asIs: '공통 컴포넌트 통합과 메이저 버전업을 병행하는데, 변경이 어느 사이트에 영향을 주는지 확인할 수단 부재. 테스트 자동화 전담 인력 없이 QA가 직접 접속해 수작업으로 확인하는 구조',
        approach:
          'Vitest 3 멀티 프로젝트(도메인 패키지, B2C/ONBP 공통 패키지) + React Testing Library로 HTTP 클라이언트·암복호화·결제/예약 유틸·커스텀 훅 검증, 패키지별 선택 실행. Playwright E2E를 운영 환경(legacy API)·dev 환경(FE Server/BFF)과 시트·도메인(B2C·BP·ONBP PC/MO) 단위로 원격 실행 — 실 SSO 연동·BFF probe로 실제 경로 검증, 실행·리포트용 Testbed UI 직접 구축. Husky pre-commit(Biome + 변경 연관 Vitest)·pre-push(빌드·타입체크·전체 테스트). OpenAPI 스펙에서 Zod/TypeBox 생성',
        toBe: '공통화·버전업 회귀를 커밋·푸시 단계에서 차단 · BE 스펙 변경의 FE 영향 지점을 컴파일 타임에 노출',
      },
      {
        title: 'AI 에이전트 컨텍스트·하네스 엔지니어링',
        asIs: '모노레포 규모가 커지며 AI 에이전트가 레이어 경계를 넘거나 컨벤션을 벗어난 코드를 반복 생성 — 사람이 리뷰에서 잡는 구조',
        approach:
          '*(컨텍스트)* 루트 AGENTS.md를 단일 소스로 Cursor·Claude·Gemini·Codex 진입점을 통일해 도구별 규칙 문서가 갈라지지 않게 구성. 패키지별 AGENTS.md로 API 계약·브라우저 어댑터·HTTP 통신 본체 역할과 B2C↔ONBP 교차 import 금지를 작업 경로별 주입. 사람용 가이드와 Cursor Skill·path-scoped Rule을 분리 — TS/TSX 편집 시에만 #region·Named Export·Biome·이벤트 규칙을 주입하고 레거시 일괄 리팩터는 범위에서 제외. *(검증 하네스)* 에이전트 산출물도 사람과 같은 Husky 품질 게이트(Biome·변경 연관 Vitest, 빌드·타입체크·전체 테스트)를 통과해야 반영되도록 구성. Playwright 시나리오 메타데이터로 registry 자동 생성·CLI/Testbed UI 실행, 실패 원인·수정 옵션·재검증 절차를 문서로 남겨 후속 에이전트 작업에 연결',
        toBe: '생성 시점(컨텍스트)과 커밋·푸시 시점(검증 하네스) 두 단계에서 아키텍처 위반·회귀 차단 · 신규 인원도 구조 파악 전부터 경계 안에서 작업',
      },
      {
        title: '팀 작업 기준 수립',
        asIs: '문서·온보딩 부재로 신규 인력의 프로젝트 파악 지연',
        approach:
          'PL과 함께 FSD 아키텍처·FE Model+Mapper 패턴·컴포넌트 공통화 기준·브랜치·배포 규칙을 정의·문서화, 문서 자동화 도구 도입. PL 부재 시 일정 조정·이슈 배분·기술 의사결정 대행',
        toBe: '아키텍처·작업 기준을 팀 공통 문서로 정립 · 문서 자동화로 프로젝트 구조·배포 규칙 파악 경로 마련',
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
    ],
  },
  {
    projectId: 'visa-center',
    title: 'V사 해외 비자센터 웹 서비스 신규 구축',
    company: '(주) YRISM',
    period: '2025.02 – 2025.03',
    role: '프론트엔드 개발',
    links: [],
    scopeTags: ['FE 단독'],
    overview:
      '중국 청도 비자센터의 비자 신청·안내 웹 서비스를 신규 구축. Next.js 15 App Router·Zustand·TanStack Query 기반 화면·API 연동, Tailwind CSS 4 반응형 UI, 한국어 페이지 구성, Azure 배포',
    techStack: ['Next.js 15', 'TypeScript', 'Zustand', 'TanStack Query', 'axios', 'Tailwind CSS 4', 'Azure'],
  },
  {
    projectId: 'commerce-backoffice',
    title: '필리핀 커머스·배달 플랫폼 백오피스 (자사 서비스)',
    company: '(주) Pinetechsoft',
    period: '2024.02 – 2024.05',
    role: '프론트엔드 개발',
    links: [],
    scopeTags: ['Mall Admin 1인 개발'],
    cases: [
      {
        title: 'Mall 백오피스 신규 구축',
        asIs: '플랫폼에 상품 판매(Mall) 기능이 추가되며 관리 백오피스 필요',
        approach:
          '구조 설계·공통 컴포넌트·REST API 연동을 단독 수행. Firebase Authentication 관리자 로그인, 상품 CRUD·옵션 자동 생성(쉼표 입력)·검색·상세, 카테고리 Drag & Drop·순서 변경, 이벤트별 상품 무한스크롤 선택, 배달비·리뷰(댓글·숨김)·주문 검색·처리, i18n',
        toBe: 'Mall 백오피스 단독 구축 완료',
      },
      {
        title: '배달비 정책 확장 (Food·Store)',
        asIs: '운영 중인 Food·Store 백오피스에 배달비 정책(기본·거리별, 점주·고객 부담 비율) 기능 추가 요구',
        approach:
          '기본·거리별 배달비 설정 UI·API 연동, 점주/고객/부분 점주 부담 복합 정책 UI, react-hook-form + Zod 폼 검증, 기존 JWT 디코딩·암호화 인증 흐름 연동, Food와 분리된 Store 도메인 요구사항 반영. Food Admin 버그 수정·기능 보완 병행',
        toBe: 'Food·Store 백오피스에 서비스별 배달비 정책 반영',
      },
    ],
    techStack: [
      'Next.js',
      'TypeScript',
      'Zustand',
      'Jotai',
      'TanStack Query',
      'MUI',
      'react-hook-form',
      'Zod',
      'Firebase',
      'AWS Amplify',
    ],
  },
  {
    projectId: 'vet-reservation',
    title: '필리핀 동물병원 예약 플랫폼 (자사 서비스)',
    company: '(주) Pinetechsoft',
    period: '2023.10 – 2024.02',
    role: '프론트엔드 개발',
    links: [],
    scopeTags: ['1인 개발', 'Admin · 예약 Web App · 소개 사이트'],
    cases: [
      {
        title: '오프라인 예약의 온라인 전환',
        asIs: '오프라인 중심의 동물병원 예약',
        approach:
          '예약 Web App — 예약 생성·조회·취소, 펫 최대 10마리 관리, Web/iOS/Android FCM 푸시. 병원용 Admin — 예약 불가일 캘린더, 예약 확정/취소 시 사용자 푸시, 사용자 조회·검색, 가입·탈퇴 현황 대시보드',
        toBe: '예약 Web App과 병원 Admin을 1인 구축해 온라인 예약으로 전환',
      },
      {
        title: '로그인 시스템 전면 개편',
        asIs: '이메일·SNS 계정 통합으로 요구사항이 바뀌어 로그인 프로세스를 대폭 수정해야 했고 사이드이펙트 다수 발생',
        approach:
          'Firebase를 활용해 FE 주도로 로그인 시스템을 전면 개편 — Firebase Email + Google/Facebook/Apple/Kakao 통합 로그인(NextAuth)',
        toBe: '이메일·SNS 계정 통합 로그인 체계로 전환',
      },
      {
        title: '푸시 오발송 방지',
        asIs: '기존 FCM 토큰 관리 구조로는 잘못된 사용자에게 푸시가 발송될 수 있는 문제',
        approach: 'FCM 토큰을 기기별로 관리하는 구조로 개선',
        toBe: '잘못된 사용자에게 푸시가 발송되는 문제 방지',
      },
      {
        title: '소개 사이트 슬라이더 버그',
        asIs: 'Swiper가 뷰포트 리사이즈 시 이미지를 잘못 노출하는 버그',
        approach:
          '라이브러리를 제거하고 fade in/out 전환을 직접 구현. 모바일·태블릿 반응형, Google Map 병원 위치, 공지사항 목록·상세',
        toBe: '슬라이더 버그 해소 · 모바일 중심 소개 사이트 구축',
      },
    ],
    techStack: [
      'Next.js',
      'TypeScript',
      'Jotai',
      'MUI',
      'Firebase',
      'NextAuth',
      'react-hook-form',
      'Yup',
      'AWS Amplify',
      'Vercel',
    ],
  },
  {
    projectId: 'patrol-app',
    title: '반려견 순찰 활동 iOS 앱',
    company: '(주) ER Solution',
    period: '2023.08',
    role: 'iOS 개발',
    links: [],
    scopeTags: ['1인 개발'],
    overview:
      '기존 반려견 관리 Web App에 실시간 순찰(산책) 기능을 추가하고 iOS 네이티브 앱으로 전환. Naver Map 실시간 이동 경로·시간·거리, 촬영 사진 위치 마커, 순찰 종료 시 지도 캡처(순찰일지)',
    cases: [
      {
        title: '강제 종료 후 순찰 이어하기',
        asIs: '앱을 강제 종료해도 순찰을 이어갈 수 있어야 한다는 요구 추가. 경과 시간은 스톱워치 방식으로 계산하는 구조',
        approach: '프로젝트 구조를 수정하고 경과 시간을 (현재 시간 − 시작 시간 + 누적 시간)으로 계산하도록 변경',
        toBe: '앱 강제 종료 후에도 이전 순찰 이어하기',
      },
    ],
    techStack: ['Swift', 'SwiftUI', 'Realm DB'],
  },
  {
    projectId: 'emission-dashboard',
    title: '대기오염 배출량 조회·시각화 시스템',
    company: '(주) ER Solution',
    period: '2023.06 – 2023.07',
    role: '풀스택 개발',
    links: [],
    scopeTags: ['FE·BE·DB 단독'],
    overview:
      '도로·지역·시간 단위 미세먼지 배출량 조회·시각화 서비스. Recharts 통계·v-world-map 지도, 조회·필터, 엑셀 업로드, Nest.js REST API·MariaDB 스키마·Swagger, AWS EC2 + Docker + Nginx + PM2 배포',
    cases: [
      {
        title: '대용량 테이블 조회 성능',
        asIs: '1.4억 건 이상 테이블 조회에 4~6분 소요',
        approach: '인덱스 최적화 및 통계 테이블 설계로 조회 병목을 구조적으로 해소',
        toBe: '조회 `4~6분 → 5초 이내` (복잡 join 시 10초 이내, `약 50배+`)',
      },
      {
        title: '차트 재렌더링 이슈',
        asIs: 'Recharts 재렌더링 시 애니메이션이 반복되는 문제',
        approach: 'useMemo + React.memo로 불필요한 재렌더링 차단',
        toBe: '재렌더링 애니메이션 이슈 해소',
      },
    ],
    techStack: [
      'React(Vite)',
      'Nest.js',
      'TypeScript',
      'MariaDB',
      'TanStack Query',
      'Recoil',
      'Docker',
      'AWS EC2',
      'Nginx',
    ],
  },
  {
    projectId: 'kiosk-app',
    title: 'E사 레미콘 입고관리 키오스크 앱',
    company: '(주) ER Solution',
    period: '2023.05 – 2023.06',
    role: '프론트엔드 개발',
    links: [],
    scopeTags: ['1인 개발'],
    overview:
      '레미콘 차량 운전자가 키오스크에서 송장을 촬영하면 입고 정보를 안내하는 Android 키오스크 앱 신규 개발. 외부 USB 카메라 연동·송장 업로드, 입고 안내 화면, 일정 시간 무입력 시 메인 화면 자동 복귀, 자동 로그인',
    cases: [
      {
        title: '키오스크 렌더링 성능',
        asIs: 'React 재렌더링으로 성능 저하',
        approach: 'useCallback + React.memo로 렌더링 최적화',
        toBe: '재렌더링으로 인한 성능 저하 해소',
      },
    ],
    techStack: ['React Native', 'TypeScript', 'Redux', 'TanStack Query'],
  },
  {
    projectId: 'eco-driving-cms',
    title: 'J시 시내버스 경제운전 관리 CMS',
    company: '(주) ER Solution',
    period: '2023.03 – 2023.04',
    role: '풀스택 개발',
    links: [],
    scopeTags: ['FE·BE·DB 단독'],
    cases: [
      {
        title: '경제운전 지표 관리 시스템 구축',
        asIs: '운수사 관리자가 버스 운행 데이터로 급가속·급감속 등 경제운전 지표를 확인할 CMS 필요',
        approach:
          '급가속·급감속·급진로변경·급회전 횟수 Chart.js 시각화, 관리자·운영자 역할 기반 권한과 운수사별 데이터 접근 제어, 복수 버스·노선 멀티 셀렉트. Java Spring + eGovFrame REST API, MariaDB 설계, AWS EC2/RDS 배포',
        toBe: '프론트·백엔드·DB·배포 단독 구축',
      },
    ],
    techStack: ['JSP', 'jQuery', 'Java', 'Spring', 'eGovFrame', 'MariaDB', 'Docker', 'AWS EC2/RDS'],
  },
  {
    projectId: 'distribution-platform',
    title: 'D사 B2B·B2C 유통 SCM·모바일 커머스',
    company: '(주) ER Solution',
    period: '2022.10 – 2023.06',
    role: '프론트엔드 개발',
    links: [],
    scopeTags: ['FE 메인', 'SCM 100% · 커머스 60%'],
    overview:
      '공급사가 등록한 상품을 판매사가 소싱해 자체 모바일 커머스와 오픈마켓(스마트스토어·지마켓·옥션)에서 판매하는 B2B·B2C 유통 플랫폼. 공급사·판매사·관리자용 SCM 어드민과 판매자 참여형 모바일 커머스 Web App의 프론트엔드를 개발. Atomic Design·Git Flow 도입',
    cases: [
      {
        title: '역할별 유통 SCM 어드민 구축',
        asIs: '공급사·판매사·관리자가 상품·재고·주문·정산을 서로 다른 권한과 관점으로 다뤄야 하는 B2B 유통 어드민 필요',
        approach:
          '쿠팡 판매자 어드민을 참고해 화면 구조 설계. 공급사 — 상품 등록·재고 관리, 특정 판매자에게만 공급하는 지정 판매, 할인율과 판매자를 정해 단기간 집중 판매하는 딜(판매자 신청 → 공급사 선택). 판매사 — 공급 상품 마켓에서 판매 제안가·최고/최소가·평가·연령대별 구매자 비율을 보고 소싱. 공통 — 주문/배송·클레임/정산·회원·상품 현황 대시보드, 매출·결제수단·상품·판매자별 통계와 엑셀 다운로드, 정산 예상·지급 내역 조회. 관리자 — 판매 상품 강제종료·해지',
        toBe: '공급 → 소싱 → 판매 → 정산으로 이어지는 유통 흐름을 역할별 어드민 화면으로 구현',
      },
      {
        title: '판매자 참여형 모바일 커머스 Web App',
        asIs: '일반 사용자도 판매자로 참여해 소싱 상품을 홍보·판매하고 수수료·리워드를 받는 모바일 전용 커머스를, 네이티브 앱이 아닌 웹뷰 기반 Web App으로 제공해야 하는 상황',
        approach:
          '앱으로 감싸는 웹뷰 구조에 맞춰 모바일 우선으로 전체 화면 퍼블리싱 — 개인·사업자 판매자 가입 분기, 라이브 방송 탭(채팅·쿠폰·마감 임박 타이머 UI), 혼자구매·같이구매 딜과 공유 링크 기반 구매자 모집 랭킹·리워드, 판매·영상리뷰·딜 랭킹, 장바구니·주문/결제, 캐시 충전·출금 신청, 판매자·구매자 마이페이지. Editor.js로 상품 상세 등록, Intersection Observer + React Query로 무한스크롤 상품 목록',
        toBe: '판매자 참여 → 라이브 판매 → 공동구매 딜 → 랭킹 리워드로 이어지는 커머스 흐름을 모바일 Web App 화면으로 구현',
      },
      {
        title: '중첩 팝업 UX 개선',
        asIs: '팝업이 4~5개 중첩되는 기획',
        approach: '팝업을 1~2개로 줄이고 상세는 페이지 전환으로 바꾸도록 제안',
        toBe: '중첩 팝업 `4~5개 → 1~2개`',
      },
      {
        title: '회의록 기반 요구사항 정리',
        asIs: '미팅에서 합의한 변경 사항이 기획서에 반영되지 않아, 미팅마다 지난 논의를 다시 확인하는 일이 반복',
        approach:
          '디자이너·기획자와의 미팅 내용을 회의록으로 요약·공유하고, 확정되지 않은 기획은 개발팀이 요구사항을 정리하며 기획 단계부터 참여',
        toBe: '지난 논의를 다시 짚는 시간 절감 · 비어 있던 기획을 개발팀 주도로 정리',
      },
    ],
    techStack: ['React(CRA)', 'JavaScript', 'Redux Toolkit', 'React Query', 'React Router', 'Nginx'],
  },
  {
    projectId: 'public-site-maintenance',
    title: 'I공사 공식 사이트 유지보수',
    company: '(주) ER Solution',
    period: '2022.09 – 2023.09',
    role: '유지보수',
    links: [],
    scopeTags: ['유지보수 담당', '재직 기간 병행'],
    cases: [
      {
        title: '웹접근성 인증·보안 점검 대응',
        asIs: '공공기관 웹접근성(WA) 인증심사와 모의해킹 점검 대응 필요',
        approach:
          '웹접근성 기준 대응, 모의해킹 결과에 따른 보안 취약점 패치·강화, JSP·Spring 레거시 페이지 구조 파악·개선. 기능 추가·수정·장애 대응 병행',
        toBe: '`WA 인증 통과` · 보안 취약점 해소',
      },
    ],
    techStack: ['JSP', 'jQuery', 'Java', 'Spring', 'eGovFrame', 'Oracle'],
  },
  {
    projectId: 'cms-site',
    title: 'S사 사용자 사이트·관리자 CMS',
    company: '(주) ER Solution',
    period: '2022.07 – 2022.09',
    role: '풀스택 개발',
    links: [],
    scopeTags: ['풀스택'],
    overview:
      '사용자 사이트(JSP)와 관리자 CMS(React) 신규 구축. DB·프로젝트 구조 설계, Q&A 게시판(MVC), CMS에서 사용자 사이트 메뉴를 DB 기반으로 동적 관리, Container-Presenter 패턴·메뉴별 권한 관리, Spring Boot REST API·MySQL, AWS EC2/RDS 배포',
    techStack: ['React', 'Redux', 'Material UI', 'JSP', 'jQuery', 'Java', 'Spring Boot', 'MySQL', 'AWS'],
  },
];

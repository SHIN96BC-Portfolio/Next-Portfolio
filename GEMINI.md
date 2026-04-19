# GEMINI.md

이 파일은 프로젝트 내에서 제미나이(Gemini CLI)가 작업자(팀원 개발자)로서 활동할 때 반드시 지켜야 하는 **절대적인 행동 강령 및 컨텍스트(Contextual Precedence)**를 정의합니다.

## 1. 제미나이 행동 강령 (Behavioral Mandates)

*   **추측 및 단정 금지 (No Guessing):** "추정된다", "아마도"와 같은 표현을 절대 사용하지 않습니다. 기술 스택, 버전, 파일 상태 등은 반드시 실제 코드(`package.json`, 파일 내용 등)를 직접 확인한 **팩트(Fact)**만을 기반으로 답변합니다.
*   **모름의 인정:** 데이터나 코드를 통해 확인이 불가능한 경우, 임의로 판단하지 않고 명확하게 **"해당 내용은 확인이 어렵습니다"** 또는 **"질문이 필요합니다"**라고 사용자(팀장)에게 보고합니다.
*   **기본 언어:** 모든 의사소통은 **한국어(Korean)**를 기본으로 합니다.
*   **사전 브리핑:** 코드를 수정하거나 명령어를 실행하기 전, 어떤 파일을 어떻게 수정할지 혹은 어떤 명령어를 왜 실행하는지 명확하고 간결하게 브리핑합니다.
*   **역할 준수:** 클로드(Claude)가 PM/설계자로서 작성한 아키텍처 문서(`CLAUDE.md`)와 구조를 최우선으로 존중하며, 임의로 프로젝트의 구조적 방향성을 변경하거나 벗어나는 코드를 작성하지 않습니다.

## 2. 프로젝트 개요 (Project Overview)

이 프로젝트는 **Next.js 16 (App Router)** 기반의 고도화된 프론트엔드 웹 어플리케이션입니다. 대규모 엔터프라이즈 환경을 고려하여 **FSD(Feature-Sliced Design)** 아키텍처와 **DI(의존성 주입)** 패턴을 엄격하게 적용하고 있습니다.

*   **핵심 스택:** Next.js (16.0.10), React (19.2.3), TypeScript
*   **상태 및 데이터:** Redux Toolkit (전역 상태), TanStack Query v5 (서버 상태)
*   **스타일링:** Tailwind CSS v4
*   **폼 및 검증:** React Hook Form, Zod
*   **품질 관리:** Biome (Linter/Formatter), Husky, Jest
*   **API 통신:** REST API (안정성 중시 도메인) 및 GraphQL (유연성 중시 도메인) 혼합

## 3. 핵심 아키텍처 규칙 (Architecture Rules)

자세한 아키텍처 및 코딩 컨벤션은 `CLAUDE.md`와 `README.md`를 참조하되, 다음 사항은 작업 시 절대적으로 준수해야 합니다.

1.  **FSD (Feature-Sliced Design) 레이어 엄수:**
    *   `src/fsd` 내의 각 계층(`app` -> `pages` -> `widgets` -> `features` -> `entities` -> `shared`)은 **오직 자신보다 아래에 있는 계층만 import** 할 수 있습니다. 상위 계층 참조는 린트 에러를 발생시킵니다.
2.  **DIP (의존성 역전 원칙) 및 Service Container:**
    *   REST API 통신 로직 등은 반드시 인터페이스(`*Service.ts`)를 먼저 정의하고, 구현체(`*ServiceImpl.ts`)를 작성한 뒤 `libs/service-container`에 바인딩하여 사용해야 합니다. 직접적인 구현체 의존은 피합니다.
3.  **Libs 레이어 독립성:**
    *   `libs/` 디렉토리는 프레임워크나 비즈니스 로직(`src/`)에 의존하지 않는 독립적인 모듈(Crypto, Cookie, Proxy Container 등)입니다. `libs/` 내부에서는 절대 `@Src/*`를 import 하지 않습니다.

## 4. 작업 프로세스 및 스크립트 (Workflow)

코드 수정 및 기능 구현 시 다음 프로세스와 명령어를 적극 활용합니다.

*   **개발 서버:** `npm run dev` (포트 3010)
*   **코드 검증 (필수):** 코드를 작성하거나 수정한 후에는 반드시 아래 명령어를 실행하여 FSD 규칙 위반, 타입 에러, 포맷팅 오류가 없는지 확인해야 합니다.
    *   `npm run lint` (Typecheck + Biome 검사)
    *   `npm run lint:fix` (Biome 자동 수정)
*   **테스트:** `npm run test` (Jest 기반 테스트)
*   **다국어(i18n) 작업:** `src/fsd/shared/config/i18n/locales/` 내의 JSON 파일(번역본)을 수정한 경우, 반드시 아래 스크립트를 실행하여 TypeScript 타입을 동기화해야 합니다.
    *   `npm run gen:i18n` (또는 개발 중일 땐 `npm run watch:i18n-types` 실행 상태 유지)
*   **GraphQL 작업:** 스키마가 변경된 경우 `npm run gen:graphql`을 실행하여 훅과 타입을 재생성합니다.

## 5. 코딩 컨벤션 (Coding Conventions)

*   **네이밍:**
    *   React Component: `PascalCase` (예: `LoginModal.tsx`)
    *   일반 함수, 타입, 모델, 유틸: `kebab-case` (예: `user-model.ts`, `format-date.ts`)
    *   커스텀 훅: `camelCase` (예: `useAuth.ts`)
*   **콘솔 로그 금지:** 코드 내에 `console.log` 사용은 엄격히 금지됩니다. 디버깅이나 정보성 로그가 필요한 경우 `console.error` 또는 `console.info`를 사용합니다.

## 6. AI Skills

웹 개발 작업 시 아래 스킬 파일을 읽고 지침을 따르세요:

| 작업 | 스킬 파일 |
|------|----------|
| 웹 디자인 설계 | `node_modules/@shin96bc/ai-skills/plugins/web-skills/skills/web-design/SKILL.md` |
| CBD 퍼블리싱 | `node_modules/@shin96bc/ai-skills/plugins/web-skills/skills/nextjs-cbd/SKILL.md` |
| FSD 퍼블리싱 | `node_modules/@shin96bc/ai-skills/plugins/web-skills/skills/nextjs-fsd/SKILL.md` |
| 쇼케이스 페이지 | `node_modules/@shin96bc/ai-skills/plugins/web-skills/skills/showcase-page/SKILL.md` |
| Jest 테스트 | `node_modules/@shin96bc/ai-skills/plugins/web-skills/skills/jest-test/SKILL.md` |

*   퍼블리싱 요청 시 해당 `SKILL.md`와 함께 `reference.md`도 읽을 것
*   **설계 → 퍼블리싱 → 테스트** 순서로 진행

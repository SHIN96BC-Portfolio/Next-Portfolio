# AGENTS.md

코딩 에이전트용 **요약 가이드**. 상세 규칙·예시의 소스 오브 트루스는 루트 [`README.md`](README.md)다. 충돌 시 README를 따른다.

관련: [`core/libs/service-container/README.md`](core/libs/service-container/README.md)

## Commands

패키지 매니저는 **pnpm** (루트 `packageManager` 참고).

```bash
# 모노레포 루트
pnpm dev:portfolio                                    # portfolio Next dev (port 3010)
pnpm start:portfolio                                  # portfolio production server
pnpm build                                            # turbo build
pnpm build:libs                                       # @core/* 빌드
pnpm lint                                             # turbo lint
pnpm typecheck                                        # turbo typecheck
pnpm biome                                            # biome check .
pnpm lint:fix                                        # biome check --write .
pnpm test                                             # turbo test
pnpm run gen:i18n                                     # portfolio i18n 일괄 생성

# portfolio 앱 필터
pnpm --filter @apps/user-portfolio run typecheck
pnpm --filter @apps/user-portfolio run lint
pnpm --filter @apps/user-portfolio run test
pnpm --filter @apps/user-portfolio run gen:i18n-types
pnpm --filter @apps/user-portfolio run watch:i18n-types
pnpm --filter @apps/user-portfolio run gen:i18n-namespaces
```

앱 로컬 스크립트(`dev` / `dev:https` / `start` 등)는 `apps/user/portfolio/package.json` 참고.

## Architecture: Feature-Sliced Design (FSD)

[FSD](https://feature-sliced.github.io/documentation/docs/get-started/overview). **상위 레이어는 하위만 import** (Biome 강제).

폴더·세그먼트·파일명 상세: **README → Design Pattern · Folder & File Name Pattern · REST Services**.

```
apps/<app>/src/fsd/
├── app/        ← providers, layouts, auth / i18n / store / react-query / mock
├── pages/      ← 화면 조립 (라우트 엔트리는 Next `src/app/`)
├── widgets/    ← 큰 UI 조각
├── features/   ← 사용자 시나리오 (login, radial-menu, …)
├── entities/   ← BE Domain (site, content, …) — api/ + model/ + ui/
└── shared/     ← 재사용 kit · validations · utils · composition (`shared/config`)
```

**Import rules:**

| From | 금지 |
|------|------|
| `shared` | 다른 FSD 레이어 전부 (**예외 아래**) |
| `entities` | features, widgets, pages, app · **다른 entities 슬라이스** |
| `features` | widgets, pages, app · **다른 features 슬라이스** |
| `widgets` | pages, app · **다른 widgets 슬라이스** |
| `pages` | app |

**동일 레이어 cross-slice:** widgets↔widgets, features↔features, entities↔entities (**서로 다른 슬라이스만**) 금지. 한 entities 도메인 안 api/model/ui 상호 import는 정상. 조합은 pages/layout, 도메인 간 공유 타입은 shared.

**`ui/` 8+ TSX:** **같은 폴더의 형제 `.tsx`** 기준(슬라이스 합계 아님). 8+면 `_parts/`/역할 폴더로 분할. 그 폴더도 8+면 같은 규칙을 **재적용** (역할 폴더로; `_parts/_parts` 금지). 8 미만이 된 부모는 유지. `index.ts` = public만. `_parts`는 상대경로; alias `@Fsd*/**/_parts/**` 금지.

**Biome cross-slice:** `widgets/**`·`features/**`에서 `@FsdWidgets/**`·`@FsdFeatures/**` alias 금지 (same-slice는 상대경로). `entities/**`에 `@FsdEntities/**` 금지는 **없음** — same-slice alias를 깨지 않기 위함(api/model 통신 금지가 아님). `_parts` alias는 앱 src 전역에서 차단.

**Biome `shared` 예외 (composition만):**

- `shared/config/service/**` — typed `AppServiceMap` + Impl bind
- `shared/config/mock/handlers/**` — MSW 도메인 handler

cookie / theme / i18n / proxy / routing 등 **나머지 config는 entities 등 상위 import 금지**.

### Core packages (`@core/*`)

```
core/
├── libs/
│   ├── service-container/  # Base, Binding, Container, CommonRes, createTypedServiceContainer
│   ├── proxy-container/
│   ├── crypto/
│   ├── cookie/
│   ├── storage/
│   └── utils/
└── bc-ui/                  # accordion, modal, sheet, print, …
```

- import: `@core/<package>` **루트 엔트리만** (deep import 금지)
- core → apps / `@Fsd*` / `@Src/**` **금지**
- 도메인 서비스 키(`SERVICE_KEY` / `AppServiceMap`)는 **앱** `shared/config/service/`에 둔다 (core에 넣지 않음)

## Path Aliases

| Alias | Path |
|-------|------|
| `@NextApp/*` | `./src/app/*` |
| `@Src/*` | `./src/*` |
| `@FsdApp/*` | `./src/fsd/app/*` |
| `@FsdPages/*` | `./src/fsd/pages/*` |
| `@FsdWidgets/*` | `./src/fsd/widgets/*` |
| `@FsdFeatures/*` | `./src/fsd/features/*` |
| `@FsdEntities/*` | `./src/fsd/entities/*` |
| `@FsdShared/*` | `./src/fsd/shared/*` |
| `@core/*` | `./core/libs/*` 또는 `./core/bc-ui` |
| `@Public/*` | `./public/*` |

## Provider Hierarchy (Root Layout)

```
StoreProvider (Redux + redux-persist)
  → ReactQueryProvider (@tanstack/react-query)
    → NextAuthProvider (next-auth)
      → AuthProvider (session → service container token)
        → MockServerInit (MSW)
          → I18nProvider (locale + preload dictionaries)
```

## Key Patterns

### REST Services

- Infra: `@core/service-container` (`createTypedServiceContainer`, Base / Binding / Container)
- Domain: `entities/<domain>/api/` — `<Domain>Service` + `Impl` + `queries` / `mutations`(없으면 생략) + `use*Service`
- DTO/모델: `entities/<domain>/model/` — **개념 단위 분할**, mega `types.ts` 금지
- Bind: `shared/config/service/service-map.ts` + `service.setup.ts`
- **DIP:** Interface만 의존, Base는 ctor 주입, singleton bind
- Method: `{HttpMethod}{LastPath}` · Req/Res: `{LastPath}{HttpMethod}Req|Res`
- queries/mutations: `find*` / `register*` / `edit*` / `remove*`
- **wire → client:** `model/server` 응답을 페이지·위젯에 그대로 쓰지 말고 `mapper`로 client 타입 변환 후 사용

### Internationalization (i18n)

- 라우트 `[lang]` (en, ko, ja)
- JSON → `pnpm run gen:i18n` (또는 filter로 types/namespaces/locales)
- Server: `getI18nTranslator()`
- Client: `useI18n(namespace)` — 서버에서 dictionary preload 후 `I18nProvider`에 `dictionaries` prop 전달 (`getI18nDictionaries`)

### Hydration

- Pure Server Component → page에서 fetch → props
- Client + SSR → React Query hydration
- Client + CSR → hooks

## Formatting & Linting (Biome)

- Indent: 2 spaces · line width: 120
- Line endings: **LF** (`biome.json` `lineEnding: "lf"`)
- Quotes: single (JS/TS), double (JSX)
- Trailing commas: ES5 · semicolons: always
- `console.log` 금지 (`console.error` / `console.info`만)
- Unused imports: error

## Git Conventions

**Branch:** `{type}/{name}/#{issueNo}` — 예: `feat/sbc/#123`

**Commit:** `[{type}/{name}] subject` — 예: `[feat/sbc] 로그인 기능 구현`

**Types:** feat, hotfix, docs, style, refactor, chore, build, deploy, revert, test

**Hooks:** pre-commit(브랜치명 + lint-staged) · pre-push(typecheck + biome) · commit-msg(메시지 형식)

## File Naming Conventions

상세: **README → Folder & File Name Pattern** (폴더=역할, 파일=개념).

| Type | Convention | Example |
|------|------------|---------|
| React Component | PascalCase | `LoginModal.tsx` |
| Next.js app router | lowercase | `page.tsx`, `layout.tsx` |
| Utility / mapper | kebab-case | `format-date.ts`, `map-server-home-section-to-client.ts` |
| Custom hook | `use` + camelCase | `useAuth.ts`, `useFindGnbQuery.ts` |
| Types / constants (다개념) | kebab-case under `model/types|constants/` | `section-config.ts`, `section-type.ts` |
| Enum file | kebab-case + `.enum` | `status.enum.ts` |
| Schema (zod) | kebab-case + `-schema` | `login-schema.ts` |
| REST Service | PascalCase | `SiteService.ts`, `SiteServiceImpl.ts` |
| Setup / bootstrap | `*.setup.ts` | `service.setup.ts` |

라우팅·페이지 키처럼 여러 도메인이 공유하는 상수는 `shared/config/routing/page-key.ts`처럼 **shared config**에 둔다 (entities 전용 상수가 아니면 content `model/constants`에 넣지 않음).

## AI Skills

웹 작업 시 해당 스킬을 읽고 따른다.

| 작업 | 스킬 파일 |
|------|----------|
| 웹 디자인 설계 | `node_modules/@shin96bc/ai-skills/plugins/web-skills/skills/web-design/SKILL.md` |
| CBD 퍼블리싱 | `node_modules/@shin96bc/ai-skills/plugins/web-skills/skills/nextjs-cbd/SKILL.md` |
| FSD 퍼블리싱 | `node_modules/@shin96bc/ai-skills/plugins/web-skills/skills/nextjs-fsd/SKILL.md` |
| 쇼케이스 페이지 | `node_modules/@shin96bc/ai-skills/plugins/web-skills/skills/showcase-page/SKILL.md` |
| Jest 테스트 | `node_modules/@shin96bc/ai-skills/plugins/web-skills/skills/jest-test/SKILL.md` |

- 퍼블리싱 요청 시 `SKILL.md`와 함께 `reference.md`도 읽을 것
- 설계 → 퍼블리싱 → 테스트 순서

## Troubleshooting

- parallel + interception route로 react-dom/router 오류 시 `.next/` 삭제 후 재빌드
- Biome `␍` / LF·CRLF 이슈: README 배포·트러블슈팅 표 + `pnpm biome check .`로 LF 정규화

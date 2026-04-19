# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev              # Dev server (port 3010)
npm run dev:https        # HTTPS dev server
npm run build            # Production build
npm run start            # Production server (port 3010)
npm run lint             # typecheck + biome
npm run typecheck        # TypeScript type checking only
npm run biome            # Biome linter only
npm run lint:fix         # Auto-fix Biome issues
npm run test             # Jest tests
npm run test:watch       # Tests in watch mode
npm run test:coverage    # Test coverage report
npm run gen:i18n         # Generate all i18n files (types, namespaces, locales)
npm run gen:i18n-types   # Generate i18n TypeScript types from JSON
npm run watch:i18n-types # Watch JSON and auto-generate i18n types
```

## Architecture: Feature-Sliced Design (FSD)

This project uses [FSD](https://feature-sliced.github.io/documentation/docs/get-started/overview) with strict layer boundaries enforced by Biome linter rules. **Each layer can only import from layers below it.**

```
src/fsd/
├── app/        ← Top layer: providers, layouts, auth/i18n/store/react-query/mock config
├── pages/      ← Page-level routing entries
├── widgets/    ← Large UI composites (combines features/entities)
├── features/   ← Feature-specific business logic (login, radial-menu)
├── entities/   ← Domain entities (auth, lang, theme, site)
└── shared/     ← Reusable: ui/, config/, domain/, validations/, common-utils/
```

**Import rules (violations cause lint errors):**
- `shared` → cannot import from any other FSD layer
- `entities` → cannot import from features, widgets, pages, app
- `features` → cannot import from widgets, pages, app
- `widgets` → cannot import from pages, app
- `pages` → cannot import from app

### Libs (independent libraries)

```
libs/
├── service-container/  # DI container (ServiceContainer, bindings, base services)
├── proxy-container/    # Proxy chain for cross-cutting concerns
├── crypto/             # AES, MD5, HMAC-SHA256 encryption
├── cookie/             # Cookie utilities
├── storage/            # Encrypted localStorage/sessionStorage
└── utils/              # isEqual, convertToQueryString, etc.
```

**Libs import rule:** Only use `@Libs/*` root entry points. No deep imports into lib internals. Libs cannot import from `@Src/**`.

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
| `@Libs/*` | `./libs/*` |
| `@Public/*` | `./public/*` |

## Provider Hierarchy (Root Layout)

```
StoreProvider (Redux + redux-persist)
  → ReactQueryProvider (@tanstack/react-query)
    → NextAuthProvider (next-auth)
      → AuthProvider (syncs session to service container)
        → MockServerInit (MSW)
          → I18nProvider (locale from [lang] route param)
```

## Key Patterns

### REST Services
- **DIP principle**: Always depend on interfaces, not implementations
- Service base classes use constructor injection (singleton)
- Naming: `{HttpMethod}{LastPathSegment}` (e.g., `getSearchGNB`)
- Request models: `{LastPath}{HttpMethod}Req` (e.g., `SearchGNBGetReq`)
- Response models: `{LastPath}{HttpMethod}Res` (e.g., `SearchGNBGetRes`)
- Query hooks: `use{Action}{LastPath}Query` (e.g., `useFindTestQuery`)
- Mutation hooks: `use{Action}{LastPath}Mutation` (e.g., `useRegisterTestMutation`)
- queries.ts/mutations.ts naming: `find*`, `register*`, `edit*`, `remove*`

### Internationalization (i18n)
- Routes use `[lang]` dynamic segment (en, ko, ja)
- Translations in JSON files → auto-generated TypeScript types via `npm run gen:i18n-types`
- Server Components: `getI18nTranslator()`
- Client Components: `useI18n()` hook

### Hydration Strategy
- Pure Server Component → fetch directly in page, pass as props
- Client Component + SSR → use React Query hydration
- Client Component + CSR → use hooks

## Formatting & Linting (Biome)

- Indent: 2 spaces
- Line width: 120
- Line endings: CRLF
- Quotes: single (JS/TS), double (JSX)
- Trailing commas: ES5
- Semicolons: always
- `console.log` forbidden (only `console.error` and `console.info` allowed)
- Unused imports: error

## Git Conventions

**Branch:** `{type}/{name}/#{issueNo}` (e.g., `feat/sbc/#123`)

**Commit:** `[{type}/{name}] subject` (e.g., `[feat/sbc] 로그인 기능 구현`)

**Types:** feat, hotfix, docs, style, refactor, chore, build, deploy, revert, test

**Hooks:**
- pre-commit: validates branch name format + runs lint-staged
- pre-push: runs typecheck + biome
- commit-msg: validates commit message format

## File Naming Conventions

| Type | Convention | Example |
|------|-----------|---------|
| React Component | PascalCase | `LoginModal.tsx` |
| Next.js page | lowercase | `page.tsx`, `layout.tsx` |
| Utility/helper | kebab-case | `format-date.ts` |
| Custom hook | camelCase | `useAuth.ts` |
| Type/model | kebab-case | `user-model.ts` |
| Enum | kebab-case + .enum | `status.enum.ts` |
| Schema (zod) | kebab-case | `user-schema.ts` |

## AI Skills

웹 개발 작업 시 아래 스킬 파일을 읽고 지침을 따르세요:

| 작업 | 스킬 파일 |
|------|----------|
| 웹 디자인 설계 | `node_modules/@shin96bc/ai-skills/plugins/web-skills/skills/web-design/SKILL.md` |
| CBD 퍼블리싱 | `node_modules/@shin96bc/ai-skills/plugins/web-skills/skills/nextjs-cbd/SKILL.md` |
| FSD 퍼블리싱 | `node_modules/@shin96bc/ai-skills/plugins/web-skills/skills/nextjs-fsd/SKILL.md` |
| 쇼케이스 페이지 | `node_modules/@shin96bc/ai-skills/plugins/web-skills/skills/showcase-page/SKILL.md` |
| Jest 테스트 | `node_modules/@shin96bc/ai-skills/plugins/web-skills/skills/jest-test/SKILL.md` |

- 퍼블리싱 요청 시 해당 SKILL.md와 함께 reference.md도 읽을 것
- 설계 → 퍼블리싱 → 테스트 순서로 진행

## Troubleshooting

- If parallel + interception routes cause react-dom/router errors, delete `.next/` and rebuild.

# AGENTS.md

코딩 에이전트용 **요약 가이드**. 상세 규칙·예시의 소스 오브 트루스는 루트 [`README.md`](README.md)다. 충돌 시 README를 따른다.

관련: [`core/libs/service-container/README.md`](core/libs/service-container/README.md)

## Commands

패키지 매니저는 **pnpm** (루트 `packageManager` 참고). 앱을 바꾸면 그 앱의 `pnpm verify:<short>` 로 합격한다. 목록: `pnpm verify:app --list`.

```bash
pnpm verify:portfolio    # 1호 full: typecheck+biome+test+guard+guard:tests+e2e+build
pnpm verify:core         # @core/* libs (앱 e2e 없음)
pnpm verify:affected     # 바뀐 경로의 verify:<short>만 (PR CI)
pnpm loop:status         # docs/loop STATE kill switch (paused=exit 2)
```

나머지 스크립트(`dev`, `lint`, `biome`, `guard:*`, `loop:lock`, 앱 filter)는 루트 `package.json` · [`README.md`](README.md) Commands.

**Harness:** [`docs/harness/`](docs/harness/README.md). 스킬: `.cursor/skills/verify` · `plan-change` · `safe-edit`.  
보안 논점(코드 반영은 B-002): [`docs/security/NOTES.md`](docs/security/NOTES.md).

Biome·FSD 린트·가드·훅·워크플로·`AGENTS.md`·`.cursor/skills` 는 human gate 다. 검사 실패를 그 파일을 느슨하게 고쳐 해결하지 않는다. 목록은 [`docs/harness/DENYLIST.md`](docs/harness/DENYLIST.md). FSD 파일과 그 보호 경로를 열면 [`.cursor/rules`](.cursor/rules) 가 같은 문서만 가리킨다.

**Loop:** [`docs/loop/`](docs/loop/). `loop: paused`면 중단.  
**Cursor = Build** · **Claude = Pre-PR** · **사람 = PR APPROVE/merge**.  
이슈 프롬프트: [`docs/loop/AI-TASK-PROMPT.md`](docs/loop/AI-TASK-PROMPT.md). 자동화: [`ai-loop.yml`](.github/workflows/ai-loop.yml).

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

**`_parts` (widgets 전용):** `widgets/**/ui/<PublicComponent>/_parts/` (component-root)만. **`ui/_parts/` 공용 통 금지** (legacy `header` 예외). `_parts` 안 분할은 `drawers|sheets|nav` — `_parts/_parts` 금지. import `./_parts/**`만 (Biome). 시나리오 UI → features, kit → shared.

**Folder structure lint:** `pnpm lint:fsd`. 규칙은 스크립트 상단 `RULES` object. `pnpm biome`에 포함.

**Biome cross-slice:** `widgets/**`·`features/**` alias 금지. `entities/**` `@FsdEntities/**` 전면 금지 **없음**.

**Biome `shared` 예외 (composition만):**

- `shared/config/service/**` — typed `AppServiceMap` + Impl bind
- `shared/config/mock/handlers/**` — MSW 도메인 handler

cookie / theme / i18n / proxy / routing 등 **나머지 config는 entities 등 상위 import 금지**.

### Core packages (`@core/*`)

```
core/
├── libs/   # service-container, proxy-container, crypto, cookie, storage, utils
└── bc-ui/  # accordion, modal, sheet, print, …
```

- import: `@core/<package>` **루트 엔트리만** (deep import 금지)
- core → apps / `@Fsd*` / `@Src/**` **금지**
- 도메인 서비스 키(`SERVICE_KEY` / `AppServiceMap`)는 **앱** `shared/config/service/`에 둔다

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

## Key Patterns

REST · i18n · hydration · Biome 포맷 · 파일명: 루트 [`README.md`](README.md) Design Pattern · Folder & File Name Pattern · REST Services.

**Git:** `{type}/{name}/{app}/#{issueNo}` / `[{type}/{name}/{app}/#{issueNo}] subject` — 예: `feat/sbc/portfolio/#123`. app은 `verify:<short>` 또는 `core` / `harness`. 훅이 강제한다.

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

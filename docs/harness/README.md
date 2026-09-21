# Monorepo harness

에이전트·CI가 쓰는 **검증·안전 게이트** 운영 SoT.  
루프: [`docs/loop/`](../loop/README.md) · 설계 living: [`DESIGN.md`](../loop/DESIGN.md) · 테스트 강제: [`TESTING.md`](./TESTING.md)

## 구조

```text
docs/harness/     ← 이 문서 · DENYLIST · TESTING
docs/loop/        ← BACKLOG / STATE / LOOP / Actions
scripts/verify-app.mjs · app-gates.mjs · guard-harness.mjs · guard-tests.mjs
pnpm verify:<short>   ← 앱별 (전 앱 일괄 금지)
```

## 앱별 게이트

| short | filter | maturity | 명령 |
|-------|--------|----------|------|
| portfolio | `@apps/user-portfolio` | **full** | `pnpm verify:portfolio` |
| commerce | `@apps/user-commerce` | lite | `pnpm verify:commerce` |
| fashion | `@apps/user-fashion` | lite | `pnpm verify:fashion` |
| social | `@apps/user-social` | lite | `pnpm verify:social` |
| master-admin | `@apps/admin-master-admin` | lite | `pnpm verify:master-admin` |
| commerce-admin | `@apps/admin-commerce-admin` | lite | `pnpm verify:commerce-admin` |
| fashion-admin | `@apps/admin-fashion-admin` | lite | `pnpm verify:fashion-admin` |
| social-admin | `@apps/admin-social-admin` | lite | `pnpm verify:social-admin` |

**full** = typecheck → biome(+fsd) → unit → `guard:harness` → `guard:tests` → e2e → build  
**lite** = typecheck → biome → guard → build (+ test 스크립트 있으면). e2e 승격은 [`../loop/ROADMAP.md`](../loop/ROADMAP.md)

```bash
pnpm verify:app --list
pnpm verify:portfolio
pnpm verify:portfolio:snap   # + snapRoutes (서버 필요할 수 있음)
pnpm verify:commerce         # lite
pnpm guard:harness
pnpm guard:harness:strict
pnpm guard:tests
```

이슈 AC·프롬프트: [`../loop/AI-TASK-PROMPT.md`](../loop/AI-TASK-PROMPT.md)

### 게이트 조각 위치 (portfolio)

| 조각 | 위치 |
|------|------|
| 스크립트 | `package.json` `verify:portfolio` → `scripts/verify-app.mjs` |
| 단위 테스트 | `apps/user/portfolio/**/*.test.ts` |
| e2e | `apps/user/portfolio/e2e/` · Playwright config |
| 가드 | `scripts/guard-harness.mjs` · `scripts/guard-tests.mjs` |
| denylist | [`DENYLIST.md`](./DENYLIST.md) |
| PR CI | [`.github/workflows/verify-portfolio.yml`](../../.github/workflows/verify-portfolio.yml) |
| Deploy quality | [`deploy-portfolio.yml`](../../.github/workflows/deploy-portfolio.yml) → 동일 `verify:portfolio` |
| env 예시 | `apps/user/portfolio/.env.example` |

### Snap / strict (옵션)

| 스위치 | 효과 |
|--------|------|
| `pnpm verify:portfolio:snap` / `VERIFY_WITH_SNAP=1` | full 후 `snapRoutes` 촬영 |
| `HARNESS_STRICT_DENYLIST=1` / `guard:harness:strict` | denylist hit → fail |
| Variable `HARNESS_STRICT_DENYLIST=1` | verify-portfolio CI에 적용 |

### 로컬 팁

```powershell
# Windows e2e — Chromium 다운로드 이슈 시
$env:PW_CHANNEL='chrome'; pnpm --filter @apps/user-portfolio run test:e2e
```

Google Fonts TLS: portfolio `next.config`의 `turbopackUseSystemTlsCerts` (필요 시).

## 성숙도 H1~H6

| 단계 | 내용 | 모노레포 |
|------|------|----------|
| H1–H2 | hooks / Biome / FSD | ✅ |
| H3 | `verify:<app>` | ✅ 전 앱 스크립트 (portfolio=full, 나머지=lite) |
| H4 | Playwright | ✅ portfolio만 |
| H5 | denylist + guard (전 apps 스캔) | ✅ |
| H5b | `guard:tests` (Jest/E2E 강제) | ✅ portfolio full |
| H6 | skills | ✅ |

## 규칙

- 에이전트는 **변경한 앱의** `pnpm verify:<short>` 로 합격한다.
- PR CI 1호: `verify-portfolio.yml` (다른 앱 CI는 온디맨드 — ROADMAP).
- denylist·보안 경로는 사람 승인 후.
- 로컬·PR·deploy quality가 **같은 verify 명령**으로 수렴하는 것이 목표.

# Harness denylist (human gate) — monorepo

에이전트·자동 루프가 **혼자 수정하면 안 되는** 경로입니다 (모노레포 공통 SoT).  
변경이 필요하면 사람 리뷰·승인 후 진행하세요. `pnpm guard:harness`가 PR/로컬 diff를 점검합니다.

형식: 각 항목은 `- \`path\`` (글로브 `*` / `**` 허용).  
앱을 추가할 때는 **앱별 절**을 아래에 이어 붙인다.

## Shared / core

- `core/libs/crypto`

## @apps/user-portfolio (full gate)

### Auth / session

- `apps/user/portfolio/src/fsd/app/auth/config/next-auth.ts`
- `apps/user/portfolio/src/fsd/shared/config/proxy/handlers/auth`

### Cookie / storage

- `apps/user/portfolio/src/fsd/shared/config/cookie`
- `apps/user/portfolio/src/fsd/shared/config/storage/storage.setup.ts`

### Env / secrets / deploy

- `apps/user/portfolio/.env`
- `apps/user/portfolio/.env.local`
- `apps/user/portfolio/.env.*.local`
- `.github/workflows/deploy-portfolio.yml`

## @apps/user-commerce (lite)

- `apps/user/commerce/.env`
- `apps/user/commerce/.env.local`
- `apps/user/commerce/.env.*.local`

## @apps/user-fashion (lite)

- `apps/user/fashion/.env`
- `apps/user/fashion/.env.local`
- `apps/user/fashion/.env.*.local`

## @apps/user-social (lite)

- `apps/user/social/.env`
- `apps/user/social/.env.local`
- `apps/user/social/.env.*.local`

## @apps/admin-master-admin (lite)

- `apps/admin/master-admin/.env`
- `apps/admin/master-admin/.env.local`
- `apps/admin/master-admin/.env.*.local`
- `.github/workflows/deploy-master-admin.yml`

## @apps/admin-commerce-admin (lite)

- `apps/admin/commerce-admin/.env`
- `apps/admin/commerce-admin/.env.local`
- `apps/admin/commerce-admin/.env.*.local`

## @apps/admin-fashion-admin (lite)

- `apps/admin/fashion-admin/.env`
- `apps/admin/fashion-admin/.env.local`
- `apps/admin/fashion-admin/.env.*.local`

## @apps/admin-social-admin (lite)

- `apps/admin/social-admin/.env`
- `apps/admin/social-admin/.env.local`
- `apps/admin/social-admin/.env.*.local`

## Notes

- 알려진 `NEXT_PUBLIC_*SECRET*` debt allowlist는 [`scripts/guard-harness.mjs`](../../scripts/guard-harness.mjs) (`SECRET_ALLOWLIST`). 코드 리라이트는 BACKLOG B-002 / `SECURITY-NOTES.tmp.md`.
- denylist 자체 변경도 human gate입니다.
- secret 스캔은 `apps/**` 전체 (`guard-harness.mjs`).
- auth/cookie 세부 경로는 앱이 성숙하면 portfolio 절과 같이 추가한다.

## Enforcement (human only)

Biome, 테스트 러너, 가드, 루프 스크립트, git hook, 게이트 워크플로, 에이전트 규칙.
에이전트가 검사 오류를 이 파일을 느슨하게 고쳐 통과시키지 못하게 하는 경로다.
로컬 `pnpm guard:harness` 는 아래 경로가 diff 에 있어도 그 이유만으로 실패하지 않는다. 적중 수는 `HARNESS_DENYLIST_HITS=<n>` 로 찍고, AI 루프는 n 이 0보다 크면 그 실행의 게이트를 실패로 본다. 에이전트가 켤 수 있는 허용 환경변수는 두지 않는다.
봇이 연 PR 은 [`.github/workflows/harness-owner-gate.yml`](../../.github/workflows/harness-owner-gate.yml) 이 베이스 브랜치의 이 목록과 CODEOWNERS 를 보고, 소유자 APPROVE 전까지 실패한다.

### Lint / test runner

- `biome.json`
- `turbo.json`
- `apps/**/jest.config.ts`
- `apps/**/playwright.config.ts`

### Guard / verify / loop scripts

- `scripts/guard-harness.mjs`
- `scripts/guard-tests.mjs`
- `scripts/guard-tests.test.mjs`
- `scripts/verify-app.mjs`
- `scripts/app-gates.mjs`
- `scripts/harness-policy.mjs`
- `scripts/harness-policy.test.mjs`
- `scripts/harness-owner-gate.mjs`
- `scripts/lint-fsd-folder-structure.mjs`
- `scripts/lint-fsd-ui-private-folders.mjs`
- `scripts/ai-loop.sh`
- `scripts/ai-loop-parse-issue.mjs`
- `scripts/ai-loop-state.mjs`
- `scripts/loop-lib.mjs`
- `scripts/loop-lib.test.mjs`
- `scripts/loop-prompt.test.mjs`
- `scripts/loop-budget.mjs`
- `scripts/loop-lock.mjs`
- `scripts/loop-status.mjs`
- `scripts/loop-unlock.mjs`

### Hooks / agent rules

- `.husky`
- `AGENTS.md`
- `CLAUDE.md`
- `.cursor/skills`
- `.cursor/rules`
- `docs/harness`
- `docs/loop/LOOP.md`

### Workflows / ownership

- `.github/CODEOWNERS`
- `.github/workflows`

`package.json` 과 `apps/**/package.json` 의 기존 `test` / `typecheck` / `lint` / `biome` / `guard:*` / `verify:*` / `loop:*` 값 변경도 같은 실패다. 의존성 번호만 바꾸는 것은 경로 denylist 에 없다.

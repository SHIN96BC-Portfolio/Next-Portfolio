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

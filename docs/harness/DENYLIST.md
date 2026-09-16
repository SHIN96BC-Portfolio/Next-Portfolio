# Harness denylist (human gate)

에이전트·자동 루프가 **혼자 수정하면 안 되는** 경로입니다.  
변경이 필요하면 사람 리뷰·승인 후 진행하세요. `pnpm guard:harness`가 PR/로컬 diff를 점검합니다.

형식: 각 항목은 `- \`path\`` (글로브 `*` / `**` 허용).

## Auth / session

- `apps/user/portfolio/src/fsd/app/auth/config/next-auth.ts`
- `apps/user/portfolio/src/fsd/shared/config/proxy/handlers/auth`

## Cookie / crypto

- `apps/user/portfolio/src/fsd/shared/config/cookie`
- `apps/user/portfolio/src/fsd/shared/config/storage/storage.setup.ts`
- `core/libs/crypto`

## Env / secrets / deploy

- `apps/user/portfolio/.env`
- `apps/user/portfolio/.env.local`
- `apps/user/portfolio/.env.*.local`
- `.github/workflows/deploy-portfolio.yml`
- `.github/workflows/deploy-master-admin.yml`

## Notes

- 알려진 `NEXT_PUBLIC_*SECRET*` debt allowlist는 [`scripts/guard-harness.mjs`](../../scripts/guard-harness.mjs) 상단 `SECRET_ALLOWLIST` (코드 리라이트는 #31).
- denylist 자체 변경도 human gate입니다.

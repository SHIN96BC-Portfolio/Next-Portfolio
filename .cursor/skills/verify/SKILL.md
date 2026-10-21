---
name: verify
description: >-
  Runs and interprets the portfolio harness gate pnpm verify:portfolio
  (typecheck, biome/fsd, unit tests, guard:harness, guard:tests, Playwright e2e, build).
  Use after code changes to @apps/user-portfolio, when finishing a task,
  or when the user asks to verify, check quality, or confirm the change passes CI.
---

# Verify portfolio harness

## Instructions

1. From the monorepo root, run:
   ```bash
   pnpm verify:portfolio
   ```
2. If it fails, fix the failure in scope (do not skip hooks or widen denylist without human approval).
3. Re-run until green. Report which step failed if you stop early.
4. Partial checks while iterating are OK:
   - `pnpm --filter @apps/user-portfolio run typecheck`
   - `pnpm biome`
   - `pnpm --filter @apps/user-portfolio run test`
   - `pnpm guard:harness`
   - `pnpm guard:tests`
   - `pnpm --filter @apps/user-portfolio run test:e2e`
5. Do not claim done without a successful app gate (or an explicit user waiver).
6. Loop Build 이후 최종 PR APPROVE는 사람이 한다. Claude `loop-verify`는 Pre-PR 검토만.
7. Full pipeline includes `guard:tests` (new logic → `*.test.ts`; page/widget → e2e or `e2e-skip:`) — `docs/harness/TESTING.md`.

## Notes

- 하네스는 모노레포 공통; 게이트는 앱별 (`verify:<app>`). 현재 1호: `@apps/user-portfolio`. See `docs/harness/README.md`.
- Windows: prefer `;` in ad-hoc PowerShell chains; the root script already uses `&&` via pnpm/cmd.
- 로컬에서 Playwright 브라우저 다운로드가 TLS로 막히면 `PW_CHANNEL=chrome` 로 시스템 Chrome 사용.

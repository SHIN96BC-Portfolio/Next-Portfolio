---
name: verify
description: >-
  Runs and interprets the portfolio harness gate pnpm verify:portfolio
  (typecheck, biome/fsd, unit tests, guard:harness, Playwright e2e, build).
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
   - `pnpm --filter @apps/user-portfolio run test:e2e`
5. Do not claim done without a successful `verify:portfolio` (or an explicit user waiver).

## Notes

- Scope is `@apps/user-portfolio` only. See `docs/harness/README.md`.
- Windows: prefer `;` in ad-hoc PowerShell chains; the root script already uses `&&` via pnpm/cmd.
- 로컬에서 Playwright 브라우저 다운로드가 TLS로 막히면 `PW_CHANNEL=chrome` 로 시스템 Chrome 사용.

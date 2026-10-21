---
name: safe-edit
description: >-
  Checks harness denylist and human-gate paths before editing. Use before
  changing auth, cookie, crypto, env, deploy, biome.json, turbo.json, jest or
  playwright config, package.json gate scripts, husky, guard/verify/loop
  scripts, GitHub workflows, AGENTS.md, or .cursor/skills. Never weaken those
  files to make a failing check pass.
---

# Safe edit (denylist / human gate)

## Instructions

1. Read `docs/harness/DENYLIST.md` before editing (모노레포 SoT, 앱별 절).
2. If the target path matches denylist (auth/cookie/crypto/env/deploy **or** biome, turbo, jest/playwright config, guard/verify/loop scripts, husky, workflows, `AGENTS.md`, `.cursor/skills`, `docs/harness`, `docs/loop/LOOP.md`):
   - Stop and tell the user this is a **human gate**.
   - Do not relax Biome, FSD lint, guards, hooks, or workflows to clear an error.
   - Do not “just fix” auth/cookie/crypto/env/deploy secrets unless the user explicitly approves that path in this turn.
3. Never add new `NEXT_PUBLIC_*SECRET*` (or PASSWORD / PRIVATE_KEY / API_KEY) usage. Existing debt is allowlisted only in `scripts/guard-harness.mjs`.
4. After approved edits, run `pnpm guard:harness` and then the app gate (`pnpm verify:<app>`, currently `verify:portfolio`).
5. Do not commit `.env` / `.env.local` or real secrets.

## Related

- `docs/harness/README.md`
- SECURITY code remediations: BACKLOG B-002 / `SECURITY-NOTES.tmp.md` (separate from harness guards)

---
name: loop-build
description: >-
  Build loop (Cursor): implement exactly one BACKLOG item, run verify:<app>,
  then hand off to Claude loop-verify before the human gets a PR. Use when the
  user asks to run a Build loop or consume the next backlog item.
---

# Loop build — Cursor

## Hard rules

1. Read `docs/loop/STATE.md` — if `loop: paused`, **stop** (no code changes).
2. `pnpm loop:lock` — fail → stop. Always `pnpm loop:unlock` when finishing or aborting.
3. Implement **exactly one** open BACKLOG item (prefer top unchecked non-blocked).
4. Respect denylist: `.cursor/skills/safe-edit` + `docs/harness/DENYLIST.md`.
4b. New logic (mapper/utils/hooks/validations): add colocated `*.test.ts`. Page/widget route changes: update Playwright `e2e/` or document `e2e-skip:` — `docs/harness/TESTING.md` / `pnpm guard:tests`.
5. Exit condition: BACKLOG에 적힌 앱의 `pnpm verify:<app>` (현재 기본 `pnpm verify:portfolio`).
6. **Do not APPROVE or merge the PR** — that is the human only.
7. **Do not self-review as final** — after green verify, hand off to **Claude** via `loop-verify` (separate chat/model). Only open/push a PR for the human after Claude returns `PASS_TO_HUMAN` (or the user explicitly waives the Claude pass).
8. Prefer worktree in `docs/loop/WORKTREE.md` when the main tree is busy.

## Pipeline (this repo)

```text
Cursor (this skill) → verify:<app>
       ↓
Claude loop-verify → PASS_TO_HUMAN | REJECT
       ↓
Human PR APPROVE / merge
```

## Steps

1. `pnpm loop:status` && `pnpm loop:lock`
2. `pnpm loop:budget -- --item <id>` — over budget → escalate in STATE, pause, unlock, stop
3. Set STATE `active_mode: build`, note WIP item id
4. Implement the single item (FSD / AGENTS / README)
5. Run the app gate (`pnpm verify:portfolio` unless BACKLOG says otherwise)
6. **Stop coding.** Ask user / open a **separate** Claude turn with `loop-verify` on the diff
7. On `PASS_TO_HUMAN` + user request: open PR (**no auto-merge**). On `REJECT`: fix within budget and re-run from step 5
8. Append `loop-run-log.md`
9. `pnpm loop:unlock`; clear WIP in STATE

## Related

- `docs/loop/LOOP.md` · `docs/loop/README.md`
- `.cursor/skills/loop-verify`
- `.cursor/skills/verify`

---
name: loop-report
description: >-
  Report-only loop: observe BACKLOG/STATE/CI and update docs/loop STATE and
  run-log without changing application code. Use when the user asks for a loop
  report, status sweep, or scheduled Report.
---

# Loop report (observe only)

## Hard rules

1. **Do not modify application/source code** (no `apps/`, `core/`, config that changes runtime). Allowed writes: `docs/loop/STATE.md`, `docs/loop/loop-run-log.md` only (and nothing else unless the user explicitly asks).
2. Read `docs/loop/STATE.md` first. If `loop: paused`, **stop immediately** — append a `skipped_paused` line to `loop-run-log.md` only if the user asked for a report run; otherwise just tell the user loops are paused.
3. Prefer `pnpm loop:status` to confirm kill switch.
4. Do not open PRs, commit, or push.
5. Do not approve Build work — that is `loop-verify` / humans.

## Steps

1. `pnpm loop:status` — exit non-zero or paused → stop.
2. Read:
   - `docs/loop/BACKLOG.md` (open items)
   - `docs/loop/STATE.md`
   - `docs/loop/LOOP.md`
   - Recent CI if available (`gh run list` / PR checks) — optional
3. Update `STATE.md`: WIP, Waiting on Human, `updated_at`. Keep `loop:` as the human left it unless they asked to set `running`.
4. Append one entry to `docs/loop/loop-run-log.md` (schema in that file).
5. Summarize for the user in Korean: open backlog count, blockers, CI signal if any.

## Related

- `docs/loop/README.md`
- `.cursor/skills/verify` (do not run full verify unless user asks — Report is observation)

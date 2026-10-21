---
name: loop-plan
description: >-
  Writes one checkable BACKLOG item under docs/loop/BACKLOG.md using plan-change
  AC shape. Use when planning a loop-ready change or filling the backlog.
---

# Loop plan (BACKLOG AC)

## Instructions

1. Read `docs/loop/STATE.md`. If `loop: paused` and the user did not ask only to draft AC, note that Build will not run until unpaused.
2. Follow `.cursor/skills/plan-change` AC shape (and `docs/loop/AI-TASK-PROMPT.md`):
   - Behavior
   - Unit (`*.test.ts` for new/changed mapper/utils/hooks; `pnpm guard:tests`)
   - E2E (update `e2e/` or `e2e-skip: <reason>` when pages/widgets change)
   - Gate: `pnpm verify:portfolio`
   - denylist note
3. Append **one** new `### B-XXX` item to `docs/loop/BACKLOG.md` (next free id).
4. One backlog item = one future Build / PR-sized change.
5. If the change touches `docs/harness/DENYLIST.md` paths, mark **Blocked: human gate**.
6. Do not implement code in this skill — planning only.

## Related

- `docs/loop/BACKLOG.md`
- `docs/loop/AI-TASK-PROMPT.md`
- `docs/harness/TESTING.md`
- `.cursor/skills/plan-change`
- `.cursor/skills/safe-edit`

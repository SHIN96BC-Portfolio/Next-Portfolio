---
name: loop-verify
description: >-
  Claude pre-PR review for loop Build output. Checks AC, verify gate, and
  denylist; returns PASS_TO_HUMAN or REJECT. Does not merge or PR-approve.
  Use in a separate Claude turn after Cursor Build — never in the same turn
  that wrote the code.
---

# Loop verify — Claude pre-PR review

사람은 **PR APPROVE / merge** 만 한다. 이 스킬은 그 **앞단**에서 Cursor 구현에 문제가 없는지 본다.

## Hard rules

1. **No product code edits** (`apps/`, `core/` runtime). Allowed: append `docs/loop/loop-run-log.md`, update `docs/loop/STATE.md` escalations only.
2. If `docs/loop/STATE.md` has `loop: paused`, stop.
3. Run in a **separate** agent/turn from Build (prefer **Claude** model). Never be the same turn that wrote the code.
4. **Do not merge, do not GitHub APPROVE the PR.** Verdict is only for whether the change is ready to show the human.
5. Reject reasons must cite failed AC lines, gate commands, or concrete defects.

## Verdicts (exactly one)

- `PASS_TO_HUMAN` — AC met, gate green (or cited), no denylist violation without approval, no blocking defects → Cursor/human may open or present the PR
- `REJECT` — list failing AC / bugs / gate failures; `pnpm loop:budget -- --item <id> --reject`

Do **not** output `APPROVE` as merge authority. If older docs say APPROVE, treat it as `PASS_TO_HUMAN`.

## Steps

1. Identify BACKLOG item id and the diff/PR under review.
2. Check each AC checkbox claim against evidence.
3. Confirm app gate: `pnpm verify:<app>` (default `verify:portfolio`) or cite a fresh green run.
4. `pnpm guard:harness` — denylist hits without human approval → `REJECT`.
4b. `pnpm guard:tests` (or cite verify log) — new logic without `*.test.ts`, or page/widget change without e2e/`e2e-skip:` → `REJECT`. See `docs/harness/TESTING.md`.
5. Look for concrete problems: regressions, FSD/import violations, missing tests for claimed AC, secrets, unsafe scope creep.
6. Emit `PASS_TO_HUMAN` or `REJECT` (and escalate if rejects ≥ `LOOP.md` limit → recommend `loop: paused`).
7. Append `loop-run-log.md` with `pass_to_human` or `reject`.

## Related

- `docs/loop/LOOP.md` Review pipeline
- `docs/loop/BACKLOG.md`
- `.cursor/skills/loop-build`
- `.cursor/skills/verify`

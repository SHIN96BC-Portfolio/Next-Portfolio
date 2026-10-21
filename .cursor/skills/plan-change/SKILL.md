---
name: plan-change
description: >-
  Helps draft checkable acceptance criteria for portfolio changes before
  implementation. Use when planning a feature, bugfix, or refactor, or when
  the user asks for AC, acceptance criteria, or a change checklist.
---

# Plan change (acceptance criteria)

## Instructions

1. Write acceptance criteria that a machine (or agent) can verify — not vague “works well”.
2. Include at least:
   - **Behavior** — what the user/system observes
   - **Unit** — new/changed logic (`mapper` / `utils` / `hooks` / `validations`) must add colocated `*.test.ts`; `pnpm guard:tests` + `pnpm --filter @apps/user-portfolio run test`
   - **E2E (if route/shell UI)** — update `e2e/*.spec.ts`, or write `e2e-skip: <reason>` in the issue; see `docs/harness/TESTING.md`
   - **Gate** — `pnpm verify:portfolio` passes (includes `guard:tests` for full apps)
3. One backlog item = one PR-sized change.
4. Call out denylist paths from `docs/harness/DENYLIST.md` if the change touches them (human gate).
5. Issue **prompt** writing: `docs/loop/AI-TASK-PROMPT.md`. Ops/env: `docs/loop/ISSUE-GUIDE.md`.

## Example AC block

```markdown
- [ ] `/ko` 홈에 site navigation이 보인다
- [ ] Unit: mapper `*.test.ts` 추가·통과 (`pnpm guard:tests` + filter test)
- [ ] E2E: smoke 갱신 또는 `e2e-skip: …`
- [ ] `pnpm verify:portfolio` 통과
- [ ] denylist 경로 미변경 (또는 사람 승인 메모)
```

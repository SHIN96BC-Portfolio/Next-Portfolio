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
   - **Test** — `pnpm --filter @apps/user-portfolio run test` (or a named new spec)
   - **UI (if UI)** — route + `pnpm --filter @apps/user-portfolio run test:e2e` expectation, or a clear manual note if e2e is out of scope
   - **Gate** — `pnpm verify:portfolio` passes
3. One backlog item = one PR-sized change.
4. Call out denylist paths from `docs/harness/DENYLIST.md` if the change touches them (human gate).

## Example AC block

```markdown
- [ ] `/ko` 홈에 site navigation이 보인다
- [ ] mapper 단위 테스트 통과 (`pnpm --filter @apps/user-portfolio run test`)
- [ ] smoke e2e 통과 (`pnpm --filter @apps/user-portfolio run test:e2e`)
- [ ] `pnpm verify:portfolio` 통과
- [ ] denylist 경로 미변경 (또는 사람 승인 메모)
```

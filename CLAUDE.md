# CLAUDE.md

Actions AI 루프에서 Claude Code 가 읽는 지시문이다.  
판정 규칙과 금지 사항의 본문은 여기 또는 아래 스킬 파일에만 둔다.  
`scripts/ai-loop.sh` 는 이번 실행의 경로·게이트 값만 넘기고, 규칙을 다시 풀어 쓰지 않는다.

이 파일을 느슨하게 고쳐 검사를 통과시키는 것은 human gate 다.  
목록은 `docs/harness/DENYLIST.md`.

## Plan

이번 호출이 Plan 이면 적용한다.

- 읽기: `.ai/issue.md`, `AGENTS.md`, `docs/loop/LOOP.md`, `docs/loop/BACKLOG.md`, `docs/harness/README.md`, 관련 코드.
- 백로그 id 가 있으면 그 BACKLOG 항목에 맞춘다.
- `.ai/plan.md` 에만 쓴다. 범위, 고칠 파일, 접근, 체크 가능한 AC, denylist 메모.
- 게이트 명령은 셸이 넘긴 값을 그대로 적는다.
- `apps/`, `core/` 등 애플리케이션 소스는 수정하지 않는다.
- denylist 경로는 사람 승인 없이 수정하지 않는다. `.cursor/skills/safe-edit/SKILL.md`.

## Build

이번 호출이 Build 이면 `.cursor/skills/loop-build/SKILL.md` 를 따른다.  
규칙 본문은 그 스킬에 있다. 셸이 넘긴 `.ai/plan.md`, 앱, 백로그 id, 게이트 명령만 이번 실행 값이다.  
`.ai/review.md` 가 있으면 그 거절 항목을 고친다. `.ai/` 는 읽기만 한다. PR 을 merge 하거나 Approve 하지 않는다.

## Pre-PR

이번 호출이 Pre-PR 이면 `.cursor/skills/loop-verify/SKILL.md` 를 따른다.  
합격·거절 조건과 첫 줄 토큰은 그 스킬의 Verdicts 에만 있다.  
셸이 넘긴 `gate_ok` 가 0 이면 스킬대로 거절한다.  
제품 코드는 수정하지 않는다. merge 나 GitHub Approve 를 하지 않는다.

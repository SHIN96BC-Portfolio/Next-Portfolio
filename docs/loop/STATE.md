# STATE

> 루프 런타임 상태. 에이전트·스크립트가 파싱한다.  
> **Kill switch:** `loop: paused`이면 모든 루프 즉시 중단.

## Status

```yaml
loop: paused
active_mode: none
# active_mode: none | report | build | verify
updated_at: 2026-09-21
```

## WIP

_없음_

## Waiting on Human

- Secrets / `ai-task` / `run:local` / 브랜치 보호 — [`ACTIONS-SETUP.md`](./ACTIONS-SETUP.md) · [`RUNNERS.md`](./RUNNERS.md)
- B-002 — SECURITY Phase1 (denylist / secret 경로)
- denylist strict (`HARNESS_STRICT_DENYLIST`) 켤지 합의

## Escalations

_없음_  
(verifier REJECT가 `LOOP.md` reject 상한을 넘으면 여기에 남기고 `loop: paused`)

## Notes

- Report만: `loop: running` + `active_mode: report`
- Build(Cursor) 후 Verify는 **Claude 별 턴** (`PASS_TO_HUMAN` | `REJECT`)
- PR APPROVE/merge는 **사람만**
- 비상 정지: `loop: paused`

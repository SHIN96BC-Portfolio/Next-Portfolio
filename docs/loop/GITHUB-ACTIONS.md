# GitHub Actions AI loop — 오케스트레이션 계약

> 정책 SoT: [`LOOP.md`](./LOOP.md) · 러너: [`RUNNERS.md`](./RUNNERS.md) · 사람 셋업: [`ACTIONS-SETUP.md`](./ACTIONS-SETUP.md)  
> 이슈 작성: [`AI-TASK-PROMPT.md`](./AI-TASK-PROMPT.md) · env/result: [`ISSUE-GUIDE.md`](./ISSUE-GUIDE.md) · 하네스: [`../harness/README.md`](../harness/README.md)  
> **실행물:** [`.github/workflows/ai-loop.yml`](../../.github/workflows/ai-loop.yml) · [`scripts/ai-loop.sh`](../../scripts/ai-loop.sh)

## 왜 Actions인가

`docs/loop` 스킬만으로는 모델 전환이 **수동**이다.  
러너에서 `claude`(Plan/Pre-PR) ↔ `agent`(Cursor Build)를 호출해야 자동이다.

역할 분담(Build / Pre-PR / 사람 APPROVE)은 [`LOOP.md`](./LOOP.md) Review pipeline이 SoT.  
cloud vs local 선택·설치는 [`RUNNERS.md`](./RUNNERS.md)가 SoT.

```text
이슈 + ai-task              → ubuntu-latest
이슈 + run:local + ai-task  → self-hosted (ai-local)
workflow_dispatch cloud|local → 동일 워크플로
  → plan → build → verify+guard → PASS_TO_HUMAN|REJECT → (PASS면) PR
```

## 이슈 → 게이트 파싱

`scripts/ai-loop-parse-issue.mjs`가 본문에서 읽는다. 필드 의미·작성법은 [`AI-TASK-PROMPT.md`](./AI-TASK-PROMPT.md) §2.2.  
운영상 알아둘 것:

| 필드 | 효과 |
|------|------|
| `app` | `ACTIVE_APP` (레지스트리 filter) |
| `verify` | `VERIFY_CMD` |
| `backlog` | budget item + STATE WIP |
| `cursor_build_model` | `agent --model` (비우면 계정 기본) |

- 이슈 **Loop config yaml** 우선  
- 레포 Variable `CURSOR_BUILD_MODEL` → `CURSOR_BUILD_MODEL_OVERRIDE` (전 실행)  
- 스모크·env 표: [`ISSUE-GUIDE.md`](./ISSUE-GUIDE.md) §2

## STATE · run-log · 스크래치

| 위치 | 역할 |
|------|------|
| `docs/loop/STATE.md` | 시작 시 WIP(issue/backlog/app) → 종료 시 clear. kill switch는 사람이 유지 |
| `docs/loop/loop-run-log.md` | 결과 append. PASS_TO_HUMAN 커밋에 포함될 수 있음 |
| `.ai/` | job 스크래치 (gitignore). Actions artifact로만 보관 |
| 브랜치 / PR / 이슈 코멘트 | VM 종료 후에도 남는 결과 |

## 운영 메모 (워크플로 계약)

- `pnpm loop:status` → `paused`면 job 즉시 중단 (`SKIPPED_PAUSED`)
- concurrency 그룹은 cloud/local **분리** — 상세 [`RUNNERS.md`](./RUNNERS.md)
- 이슈 본문은 **env로만** 전달 (셸 인젝션 완화)
- `author_association` OWNER/MEMBER/COLLABORATOR만 라벨 트리거 실행
- result 코드표: [`ISSUE-GUIDE.md`](./ISSUE-GUIDE.md) §4

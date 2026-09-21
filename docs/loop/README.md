# Monorepo loop

모노레포 **루프 메모리·정책·Actions**.  
합격 신호(verify): [`docs/harness/README.md`](../harness/README.md)

## 누가 무엇을 보나

| 읽고 싶은 것 | 문서 |
|--------------|------|
| 4층 설계·의도 | [`DESIGN.md`](./DESIGN.md) |
| 정책·limits·역할 | [`LOOP.md`](./LOOP.md) |
| 이슈 프롬프트 작성 | [`AI-TASK-PROMPT.md`](./AI-TASK-PROMPT.md) |
| 이슈 env·result | [`ISSUE-GUIDE.md`](./ISSUE-GUIDE.md) |
| Secrets·보호 셋업 | [`ACTIONS-SETUP.md`](./ACTIONS-SETUP.md) |
| cloud vs local | [`RUNNERS.md`](./RUNNERS.md) |
| Actions 계약 | [`GITHUB-ACTIONS.md`](./GITHUB-ACTIONS.md) |
| 후순위 | [`ROADMAP.md`](./ROADMAP.md) |
| worktree | [`WORKTREE.md`](./WORKTREE.md) |
| 런타임 | [`BACKLOG.md`](./BACKLOG.md) · [`STATE.md`](./STATE.md) · [`loop-run-log.md`](./loop-run-log.md) |

## 역할 (SoT: LOOP.md)

```text
Cursor Build → verify → Claude PASS_TO_HUMAN|REJECT → 사람 PR APPROVE/merge
```

## 명령

```bash
pnpm verify:portfolio
pnpm loop:status    # paused → exit 2
pnpm guard:harness
```

Kill switch: `STATE.md` → `loop: paused`

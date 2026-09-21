# Worktree (Build 격리)

메인 워킹트리와 분리해 Build 루프를 돌릴 때의 **수동 절차**.  
자동화 스크립트는 후순위 — 지금은 문서 + `pnpm loop:lock`으로 동시성만 막는다.

## 언제

- Build 모드로 코드 변경을 할 때 (Report는 worktree 불필요)
- 사람/다른 에이전트가 같은 브랜치에서 작업 중일 때

## 절차

```bash
# 1) kill switch + lock
pnpm loop:status          # running 이어야 진행
pnpm loop:lock            # 실패 시 중단

# 2) worktree (예)
git fetch origin
git worktree add ../Next-Portfolio-loop -b chore/sbc/loop-build origin/master

# 3) worktree에서 의존성·구현
cd ../Next-Portfolio-loop
pnpm install
# … BACKLOG 한 항목만 구현 …
pnpm verify:portfolio   # 또는 BACKLOG Scope의 verify:<app>

# 4) Claude loop-verify → PASS_TO_HUMAN 후에만 사람에게 PR
# gh pr create … (auto-merge 금지). PR APPROVE는 사람.
cd ../Next-Portfolio
pnpm loop:unlock
git worktree remove ../Next-Portfolio-loop
```

## Cursor Cloud worktree

- `loop: paused`면 중단
- 한 항목만 · denylist 금지 · `verify:<app>`
- Claude Pre-PR 후 **사람** merge

## 하지 말 것

- lock 없이 두 Build 동시 실행
- worktree에서 master에 직접 push
- denylist 경로를 “일단 고치고” PR

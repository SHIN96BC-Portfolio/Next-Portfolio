# LOOP

> 모노레포 루프 정책의 **단일 소스**(limits · gates · active loops · 역할 분담).  
> denylist 경로 목록은 하네스에 두고 여기서 **참조**한다.

## Scope

- Repo: 모노레포 공통 (`docs/loop`, `scripts/loop-*`, loop skills)
- Active app (1호): `@apps/user-portfolio`
- Exit condition (active): `pnpm verify:portfolio`  
  (타 앱 온보딩 시 BACKLOG Scope + `verify:<app>` 로 확장 — 전 앱 일괄 게이트 금지)
- **PR APPROVE / merge: 사람만** (auto-merge 금지)
- **Pre-PR review: Claude** (`loop-verify`) — 문제 없으면 사람에게 PR 전달

## Review pipeline

```text
1. Cursor  loop-build     → 구현 + verify:<app>
2. Claude  loop-verify    → PASS_TO_HUMAN | REJECT  (머지 권한 없음)
3. Human                  → PR APPROVE / merge
```

| 역할 | 담당 | 할 수 있는 것 | 금지 |
|------|------|----------------|------|
| Build | Cursor | 코드 변경, verify 실행, PR 초안 준비 | 자기 APPROVE, merge |
| Pre-PR review | Claude | AC·diff·게이트·denylist 점검, PASS/REJECT | 제품 코드 수정, PR merge |
| Owner | 사람 | PR APPROVE, merge, denylist 예외 | — |

## Denylist (SoT)

- 경로 목록: [`docs/harness/DENYLIST.md`](../harness/DENYLIST.md)
- 가드: `pnpm guard:harness` (`--strict-denylist`는 합의 후 — [`ROADMAP.md`](./ROADMAP.md))
- 루프/에이전트는 denylist 경로를 **사람 승인 없이 수정하지 않는다** (`.cursor/skills/safe-edit`)

## Limits

```yaml
max_build_attempts_per_item: 3
max_verifier_rejects_per_item: 2
max_concurrent_loops: 1
token_budget_note: "무제한 루프 금지 — 상한 초과 시 STATE escalation + loop: paused"
```

`max_concurrent_loops` / `pnpm loop:lock` 은 **같은 워킹트리(호스트) 프로세스** 기준이다.  
Actions의 cloud/local **concurrency 그룹 분리**(`ai-loop-cloud` / `ai-loop-local`)와는 층이 다르다 — 두 러너가 동시에 돌 수 있으나 구독 한도는 공유 ([`RUNNERS.md`](./RUNNERS.md)).

## Active loops

| Mode | Enabled | Actor | Skill |
|------|---------|-------|-------|
| report | yes | Cursor 또는 스케줄 | `loop-report` |
| build | yes (AC 있을 때만) | **Cursor** | `loop-build` |
| plan | yes | Cursor | `loop-plan` |
| verify | yes (Build와 분리) | **Claude** | `loop-verify` |

## Human gates

- [`docs/harness/DENYLIST.md`](../harness/DENYLIST.md) 전 항목
- SECURITY 코드 리라이트 (BACKLOG B-002 / `SECURITY-NOTES.tmp.md`)
- `docs/harness/DENYLIST.md` / `LOOP.md` limits 변경 자체
- force push · `--no-verify` · auto-merge 설정
- **최종 PR APPROVE / merge**

## Lock / budget scripts

```bash
pnpm loop:status
pnpm loop:lock
pnpm loop:unlock
pnpm loop:budget -- --item B-001
```

## Worktree

절차: [`WORKTREE.md`](./WORKTREE.md)

## GitHub Actions automation

- 오케스트레이션: [`GITHUB-ACTIONS.md`](./GITHUB-ACTIONS.md)
- **클라우드 vs 로컬:** [`RUNNERS.md`](./RUNNERS.md)
- 사람 셋업: [`ACTIONS-SETUP.md`](./ACTIONS-SETUP.md)
- 워크플로: `.github/workflows/ai-loop.yml`
- 스크립트: `scripts/ai-loop.sh` (`PASS_TO_HUMAN` | `REJECT`)

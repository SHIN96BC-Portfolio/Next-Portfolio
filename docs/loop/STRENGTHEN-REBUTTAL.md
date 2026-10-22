# STRENGTHEN 반박

> 2026-10-22. 대상: 1차 [`STRENGTHEN.md`](./STRENGTHEN.md) (워킹트리만).  
> 재평가 반영본은 같은 파일에 덮어썼다. 이 파일은 1차 측정 오차 기록으로 남긴다.  
> GitHub UI는 레포 파일에 안 남는다. 이 파일은 **그 측정 오차**와, 문서가 과장한 칸만 적는다.

STRENGTHEN의 잣대(기본 경로가 실패로 막는지 / 사람 없이 한 번 돌았는지)는 유지한다.  
빈칸이 아닌 것을 P0로 두면 점수가 깎이고, 강화 순서 1번이 이미 끝난 일을 막는다.

---

## 측정 오차

STRENGTHEN은 워킹트리 + [`STATE.md`](./STATE.md) Waiting on Human만 봤다.

```21:23:docs/loop/STATE.md
- Secrets / `ai-task` / `run:local` / 브랜치 보호 — ACTIONS-SETUP · RUNNERS
- 머지 후 ruleset 필수 체크에 `harness-owner-gate` 추가
- B-002 — SECURITY Phase1
```

Ruleset은 GitHub Settings에만 있다. 워크플로 yml이 있다고 “필수 체크가 아니다”고 단정하면, 사람이 이미 켠 잠금을 없는 것으로 채점한다.  
하네스 7.7의 “머지 잠금은 남음”, 강화 순서 1번(H-1)이 그 경로다.

확인 방법: `GET /repos/SHIN96BC-Portfolio/Next-Portfolio/rulesets` (파일 grep이 아님).

---

## 반박하는 칸

### H-1 — P0 “ruleset 필수 체크가 아님” → **닫힘**

2026-10-21 GitHub에 이미 걸려 있다. STRENGTHEN 작성일(2026-10-22) 기준 빈칸이 아니다.

| 항목 | 라이브 |
|------|--------|
| 이름 | `protect-default-no-ai-merge` |
| id | `24093423` |
| enforcement | `active` |
| 대상 | default branch |
| 삭제 / force push | 금지 |
| PR 필수 | 예. Required approvals **0** |
| Code Owners 리뷰 필수 | 꺼 둠 (본인 PR 자기 Approve 불가 회피) |
| Bypass | 응답에 `bypass_actors` 없음 (비움) |
| 필수 체크 | `verify:portfolio`, **`harness-owner-gate`** |
| 갱신 | 2026-10-21T04:58Z (`harness-owner-gate` 추가 시점과 맞음) |

UI: https://github.com/SHIN96BC-Portfolio/Next-Portfolio/rules/24093423

STRENGTHEN “끝났을 때”와 대조:

- 봇이 `biome.json`을 넣은 PR → `harness-owner-gate` 실패로 머지 막힘: **ruleset이 함**
- 제품 코드만 바꾼 PR → owner-gate 성공: **워크플로가 함**
- 소유자 Approve 후 재실행하면 봇 PR 통과: **워크플로가 함**

남은 구멍은 “ruleset이 없다”가 아니다.

- `AI_BOT_TOKEN` GitHub 유저가 `@SHIN96BC`이면 owner-gate가 **봇 PR을 사람 PR로 본다**. 그건 [`ACTIONS-SETUP.md`](./ACTIONS-SETUP.md) §6.2. H-1이 아니라 토큰 분리.
- 워크플로에 `gh pr merge` 스텝은 없다. 소유자 PAT가 로컬에서 merge를 치면 ruleset이 사람을 막지는 않는다. 그건 “필수 체크 미설정”과 다른 문장이다.

**점수:** 하네스 한 줄에서 “머지 잠금은 남음”을 빼야 한다. 잠금은 켜져 있다. 남는 P0는 H-2(시크릿)뿐.

**순서:** 강화 1번(H-1 사람 ruleset)은 완료. 다음 사람 일은 H-2 / 토큰 분리이지, ruleset을 또 만드는 일이 아니다.

[`STATE.md`](./STATE.md) Waiting on Human 둘째 줄과 ROADMAP 스모크 `[ ]`는 이 사실을 반영하지 못한 living doc이다. C-1과 같은 종류의 어긋남이다.

---

### L-1 — P0 “Actions 셋업이 체크리스트” → **과대**

Secrets·`ai-task`·클라우드 1회는 끝났다.

- issue-39 → `PASS_TO_HUMAN` → PR #44 merge (2026-10-21)
- [`loop-run-log.md`](./loop-run-log.md)에 build/verify/actions가 남음
- 토큰이 없거나 라벨이 없으면 그 실행이 성립하지 않음

STRENGTHEN 본문도 “issue-39 1회는 통과”를 적고도 L-1을 P0 빈칸으로 둔다.  
STATE Waiting 첫째 줄(Secrets / `ai-task` / `run:local` / 브랜치 보호)을 통째로 미완으로 읽은 결과다.

아직 체크리스트인 것만 남긴다.

- `run:local` 러너: 클라우드 스모크와 별개. 안 켰으면 P2
- 브랜치 보호: 위 H-1로 **됨**
- 봇 계정 ≠ `@SHIN96BC`: 6.2, L-1 전체가 아님

루프 7.1의 가점은 이미 “1회 통과”다. L-1을 P0로 두면 같은 사실을 두 번 깎는다.

---

### H-5 — “env면 e2e 전 실행 스킵” → **과장**

`HARNESS_E2E_SKIP` / STATE `e2e-skip:`은 [`scripts/guard-tests.mjs`](../../scripts/guard-tests.mjs)가 **페이지·위젯 diff에 e2e 스펙이 있는지**만 건너뛴다.

[`scripts/verify-app.mjs`](../../scripts/verify-app.mjs) / [`scripts/ai-loop.sh`](../../scripts/ai-loop.sh)는 `HARNESS_TESTS_SOFT` · `SKIP_BIOME` · `HARNESS_SCAN_ROOTS`만 지운다. `HARNESS_E2E_SKIP`은 unset하지 않고, Playwright 본실행도 그 env로 끄지 않는다.  
지금 STATE에 `e2e-skip:` 줄도 없다.

가드 우회를 줄이는 일은 P2로 남을 수 있다. “verify가 e2e를 조용히 안 돌린다”는 아니다.

---

### H-3 — “auth denylist가 portfolio만” → **범위가 넓음**

구멍은 `apps/admin/master-admin/.../next-auth.ts` 같은 **auth 소스**가 DENYLIST·CODEOWNERS에 없는 것이다.

`.env*` · deploy 워크플로는 이미 전 앱(및 master-admin deploy) 절에 있다. “denylist 전체가 portfolio-only”는 아님.

---

### C-1 — “현황 표는 2026-09, 기본 paused” → **위치만 틀림**

어긋남 자체는 있다. [`DESIGN.md`](./DESIGN.md) L38 현재 포지션이 `loop: paused`, [`STATE.md`](./STATE.md)는 `running`.

현황 표 footer는 이미 2026-10-22이고 STRENGTHEN을 가리킨다. “표가 9월이라서 틀린다”는 오인용이다.  
고칠 곳은 L38 한 줄이지, 표 전체를 STATE로 복제하는 일이 아니다.

---

### C-3 — 줄 수

방향(매 턴 always-apply가 두껍고, 슬라이스 인덱스가 없음)은 맞다.  
숫자는 AGENTS ~223, README ~1573이다. 168 / 1202는 HEAD 이전 값.

---

### L-4 — “공개 전환 시 skip-permissions 축소” → **시제가 미래**

레포 visibility는 이미 `public`. 플래그는 워크플로 env가 아니라 [`scripts/ai-loop.sh`](../../scripts/ai-loop.sh) 기본값 `AI_LOOP_CLAUDE_FLAGS=--dangerously-skip-permissions`.

공개 전환을 기다릴 빈칸이 아니다. 지금 기본값이 그것이다. 바꿀지는 사람 결정(P2). 루프 점수를 P0으로 깎을 항목은 아님.

---

## 반박하지 않는 칸

이건 빈칸으로 남기는 게 맞다.

| ID | 이유 |
|----|------|
| **H-2** | `SECRET_ALLOWLIST` 7개. 코드 이전 전. B-002 |
| **H-4** | e2e `/ko`·`/ko/resume`만. schema/Impl 테스트 없음. 이번 diff만 강제 |
| **H-6** | full은 portfolio. 루프 1호 유지가 맞음 |
| **C-2** | `SECURITY-NOTES.tmp.md` + AGENTS 미링크 |
| **L-2** | Open에 체크 가능한 제품 항목 없음. 루프가 굶는 진짜 이유 |
| **L-3** | cron/worktree는 후순위. 맞음 |
| **6.2 토큰** | PAT = `@SHIN96BC`. ruleset이 켜져 있어도 owner-gate는 루프 PR을 사람 PR로 통과 |

---

## 점수 · 순서

STRENGTHEN 오늘 점수: 컨텍스트 7.6 / 하네스 7.7 / 루프 7.1.

H-1을 미완 P0로 둔 채 “머지 잠금은 남음”으로 하네스를 깎으면 **GitHub에 있는 잠금을 문서 미갱신으로 재평가한 것**이다.

| 층 | STRENGTHEN | 이 반박 후 | 한 줄 |
|----|------------|------------|--------|
| 컨텍스트 | 7.6 | 7.6 | C-1은 한 줄 어긋남. 두께(C-3)는 그대로 |
| 하네스 | 7.7 | **8.2** | 머지 잠금은 켜짐. 남는 P0는 시크릿(H-2). 테스트 깊이·lite는 P1~P2 |
| 루프 | 7.1 | **7.4** | 셋업 스모크·ruleset은 됨. 점수를 낮추는 건 제품 BACKLOG 부재(L-2) |

강화 순서 수정:

1. ~~H-1 ruleset~~ **완료 (2026-10-21)**
2. ~~L-1 Secrets·라벨·스모크~~ **클라우드 스모크 완료.** 남은 건 `run:local`(선택), PAT 분리(6.2)
3. H-2 / B-002 — 사람, 그대로
4. L-2 — 제품 BACKLOG 한 줄. **지금 루프를 막는 것**
5. H-4 등 — STRENGTHEN과 같음
6. C-1·C-2·C-3 — 문서. STATE Waiting에서 끝난 ruleset 줄을 지우는 것도 C-1에 포함

앞 단계가 끝나기 전에 다음을 루프에 맡기지 말라는 규칙은 유지한다.  
다만 1·2가 이미 끝났으므로 L-2를 “H-1 끝날 때까지 금지”로 두면 안 된다.

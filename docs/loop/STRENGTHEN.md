# 컨텍스트 · 하네스 · 루프 — 빈칸과 강화

> 2026-10-27 (#83) 점수 표 갱신. 1차·2차 본문은 2026-10-22.  
> 설계: [`DESIGN.md`](./DESIGN.md) · 운영: [`../harness/README.md`](../harness/README.md) · [`LOOP.md`](./LOOP.md)  
> 사람 셋업: [`ACTIONS-SETUP.md`](./ACTIONS-SETUP.md) · 후순위: [`ROADMAP.md`](./ROADMAP.md)

**이 파일의 역할:** 지금 부족한 것, 왜 부족한지, 어떻게 닫을지.  
정책·게이트 표는 여기 다시 쓰지 않는다.

점수는 문서에 적힌 완료가 아니라, **기본 경로가 실패로 막는지**와 **사람 없이 한 번이라도 돌았는지**다.  
10점은 그 층이 사람 없이 같은 품질로 반복되는 상태.

1차는 GitHub Settings를 STATE Waiting으로만 봤다. Ruleset은 파일 grep으로 안 보인다. 그 측정 오차는 반박이 맞다.

| 층 | 1차 | 재평가 | 2026-10-27 | 한 줄 |
|----|-----|--------|------------|--------|
| 컨텍스트 | 7.6 | 7.6 | **8.3** | #83 AGENTS Commands 슬림. site/content 인덱스·C-1 L38은 이전 이슈 |
| 하네스 | 7.7 | 8.0 | **8.3** | #83 schema 가드. 단단한 8.5는 6.2 스모크. H-2(B-002)는 8.7 |
| 루프 | 7.1 | 7.3 | **8.0** | Open에 B-006 AC. 8.3은 B-006 루프 사이클 후. 6.2 스모크는 사람 |

**목표: 세 층 모두 8.x.** 완성도로 말하는 선이다. 10은 사람 merge가 끝이라 설계상 안 간다 (천장 ~9.0). 현실 완성 구간은 8.3 / 8.5 / 8.3.

| 층 | 지금 | 현실 완성(8.3/8.5/8.3)에 남은 칸 | 그 위에서 더 올리는 것 |
|----|------|-----------------------------------|------------------------|
| 컨텍스트 | **8.3** | 선. living doc 표는 이 PR | README SoT 유지 |
| 하네스 | **8.3** | **6.2 스모크** (봇 PR owner-gate 실패) | H-2 시크릿 (B-002) |
| 루프 | **8.0** | **B-006 루프 한 사이클** + 6.2 | cron·worktree (범위 밖) |

C-1만, 또는 BACKLOG 한 줄만으로는 8.x가 안 된다.

반박의 8.2 / 7.4와의 차이는 아래 “남은 반박”이다.

---

## 이미 있는 것 (강화 대상 아님)

| 층 | 레일 |
|----|------|
| 컨텍스트 | README 상세 / AGENTS 요약 / CLAUDE는 스킬 포인터. FSD·denylist glob 규칙은 본문 복붙 없음. Biome + `lint:fsd` |
| 하네스 | `verify:<app>` 레지스트리. portfolio = full. pre-push에 typecheck·biome·`guard:harness`·`guard:tests`. `harness-owner-gate`는 베이스 브랜치 실행 |
| 하네스 | **ruleset `protect-default-no-ai-merge` (id 24093423, active).** 필수 체크 `verify-affected` + `harness-owner-gate`. 삭제·force push 금지. PR 필수. Bypass 없음. 갱신 2026-10-26 |
| 루프 | Plan → Cursor Build → verify → Claude Pre-PR → 사람 PR. kill switch, lock, 예산 초과 시 `paused`. 빈 제품 diff는 PASS 강등 |
| 루프 | issue-39 → PR #44 merge (작성·머지 모두 `@SHIN96BC`, 2026-10-21). Secrets·`ai-task`·클라우드 실행은 성립함 |

---

## 1차에서 접은 칸

| ID | 1차 | 재평가 | 메모 |
|----|-----|--------|------|
| **H-1** | P0 미완 | **닫힘** | API로 ruleset 확인. STATE Waiting 둘째 줄은 living doc 미갱신 (C-1과 같음) |
| **L-1** | P0 통째 미완 | **클라우드 루프는 됨.** 남은 건 `run:local`(P2), PAT 분리(6.2) | issue-39가 토큰·라벨 없이 성립하지 않음. “봇 merge 거절” 스모크는 PAT=소유자라 아직 증명 못 함 |
| **H-5** | “verify가 e2e를 안 돌린다” | **과장. P2 가드 우회만** | `HARNESS_E2E_SKIP`은 `guard:tests`의 “스펙 갱신 여부”만 건너뜀. `verify-app` Playwright는 그대로 돈다 |
| **H-3** | 범위 오해 가능 | **auth 소스만.** `.env`/deploy는 전 앱 | 1차 제목은 이미 “auth denylist”. 구멍을 `next-auth.ts` 등으로 좁힌다 |
| **C-1** | 현황 표가 9월 | **고칠 곳은 DESIGN L38** | footer는 이미 2026-10-22. `기본 loop: paused` vs STATE `running` |
| **C-3** | 168 / 1202 | **223 / 1573** (전체 줄) | 방향(always-apply 두께, 슬라이스 인덱스 없음)은 유지 |
| **L-4 시제** | “공개 전환 시” | **이미 public** | `visibility: public`. 플래그 축소는 미래 이벤트가 아님 |

---

## 남은 반박 (8.2 / 7.4를 그대로 안 받는 이유)

### 1. “머지 잠금은 켜져 있다” — ruleset은 켜짐, 루프 PR에는 구멍이 있음

ruleset이 없는 것처럼 채점한 1차는 철회한다.

남은 구멍은 반박이 6.2로 분리한 바로 그것이다. 분리는 맞다. 하네스 점수에서 거의 안 깎는 것은 과하다.

- PR #44 `user` = `@SHIN96BC`. 루프가 연 PR은 소유자 PR이다.
- `filesMissingOwnerApproval`: 작성자가 CODEOWNERS이면 APPROVE 없이 통과 ([`harness-policy.test.mjs`](../../scripts/harness-policy.test.mjs) `author SHIN96BC` → `[]`).
- ruleset: Required approvals **0**, Code Owners 리뷰 **꺼 둠**. `restrict who can push` 규칙은 응답에 없음.
- 워크플로에 `gh pr merge`는 없다. 같은 PAT로 로컬/`gh` merge를 치면 ruleset이 사람을 막지 않는다.

그래서 “봇이 `biome.json`을 넣은 PR → owner-gate 실패”는 **별도 봇 계정일 때만** 성립한다. 지금 루프 PR에는 그 문장이 해당하지 않는다.

하네스 **8.0** (반박 8.2에서 0.2). 잠금 자체를 미완 P0로 되돌리지는 않는다.

### 2. L-1 “클라우드 스모크 완료” — 루프 실행 ≠ merge 거절 스모크

[`ACTIONS-SETUP.md`](./ACTIONS-SETUP.md) §3.4 / §7 스모크는 (1) 사람 merge 가능 (2) **봇 토큰 `gh pr merge` 거절** (3) 루프는 `gh pr create`까지다.

PR #44는 (1)(3)이다. `merged_by`도 `@SHIN96BC`. (2)는 PAT=소유자 + approvals 0이면 **거절이 아니라 허용**이다.

L-1 전체를 P0로 둔 1차는 철회한다. “셋업 체크리스트가 끝”으로 읽지는 않는다.

### 3. L-4 — 시제는 미래가 아니다. P0는 아니지만 P2도 아니다

레포는 public. `ai-loop.sh` 기본이 `--dangerously-skip-permissions`. 이건 맞다.

P0로 깎지 않는 것도 맞다. `author_association` OWNER/MEMBER/COLLABORATOR가 있어 익명 이슈만으로는 안 돈다.

다만 공개 + skip-permissions는 **지금 기본값**이다. 바꿀지 사람 결정인 것은 같고, 우선은 **P1**. 루프를 7.4까지 올리기 전에 이 한 칸을 P2로 두면 시제 오류를 인정하고도 위험을 낮게 본 것이다.

루프 **7.3**.

---

## 1. 컨텍스트 엔지니어링

### 부족한 점

| ID | 우선 | 담당 | 빈칸 | 근거 |
|----|------|------|------|------|
| C-1 | 닫힘 | 에이전트 | DESIGN L38 | STATE의 running / paused 와 맞음 |
| C-2 | 닫힘 #78 | 사람 | SECURITY-NOTES 정식화 | `docs/security/NOTES.md` + AGENTS 링크. 코드 이전은 B-002 |
| C-3 | 닫힘 #83 | 사람+에이전트 | AGENTS 두께·슬라이스 인덱스 | Commands=`verify:<short>`. site/content README + glob rule |

### 어떻게 강화할지

**C-1** — DESIGN L38을 STATE에 맞춘다. 현황 표를 STATE로 복제하지 않는다. STATE Waiting에서 끝난 ruleset 줄을 지운다.

**C-2** — 완료 #78. `docs/security/NOTES.md` + AGENTS 링크. 코드 이전은 B-002.

**C-3** — 완료 #56 인덱스 + #83 AGENTS Commands 슬림. REST/i18n/git은 glob rule + README.

하지 말 것: README를 AGENTS에 복붙.

---

## 2. 하네스 엔지니어링

### 부족한 점

| ID | 우선 | 담당 | 빈칸 | 근거 |
|----|------|------|------|------|
| H-2 | P0 | 사람 | `NEXT_PUBLIC_*SECRET*` 7개가 allowlist | `SECRET_ALLOWLIST`. 신규만 fail. [B-002](./BACKLOG.md) |
| 6.2 | P0 | 사람 | 루프 PAT = CODEOWNERS | PR #44 작성자 `@SHIN96BC`. owner-gate가 그 PR의 보호 파일을 사람 PR로 통과 |
| H-3 | 닫힘 #76 | 사람 | master-admin next-auth denylist | CODEOWNERS + DENYLIST. 로직 리라이트는 B-002 |
| H-4 | 닫힘 #62 #66 #83 | 에이전트 | 합격 신호 | Jest 13파일. e2e 6경로. `features/**/model/*-schema.ts`를 `guard:tests` include |
| H-5 | 닫힘 #81 | 사람 | 가드 e2e-skip 우회 | env·STATE.md로 스펙 강제를 건너뛰지 않음. Playwright는 그대로 |
| H-6 | P2 | 사람 | full은 portfolio 하나 | 1호 유지가 맞음. 그 앱을 루프에 넣기 전에 승격 |

### 어떻게 강화할지

**H-2** — 시크릿을 서버 env로 옮긴 뒤 allowlist 축소. allowlist를 먼저 지우지 않는다.

**6.2** — `AI_BOT_TOKEN` GitHub 유저 ≠ `@SHIN96BC`. 그 전에는 “봇 보호 파일 PR이 owner-gate에서 실패한다”고 말하지 않는다. 절차: [`ACTIONS-SETUP.md`](./ACTIONS-SETUP.md) §6.2.

**H-3** — 완료 #76. `master-admin` `next-auth.ts` DENYLIST + CODEOWNERS. 로직 리라이트는 B-002.

**H-4** — 완료. login/print/interception e2e (#66). `login-schema`·`password-strength` Jest (#62). schema include (#83).

**H-5** — 완료 #81. `HARNESS_E2E_SKIP` unset, skip 판정에서 STATE.md 제거. Playwright 본실행은 그대로.

**H-6** — 그 앱을 루프 대상으로 쓰기 전에 Playwright smoke + `maturity: 'full'`.

하지 말 것: 검사 실패를 biome/denylist/guard를 느슨히 해서 통과시키기.

---

## 3. 루프 엔지니어링

### 부족한 점

| ID | 우선 | 담당 | 빈칸 | 근거 |
|----|------|------|------|------|
| L-2 | P1 | 사람+루프 | B-006 사이클 전 | Open에 B-006 AC (#83). 구현·verify·Pre-PR·사람 merge가 남음. B-002는 blocked |
| L-4 | 닫힘 #54 | 사람 | 기본 skip-permissions 제거 | `ai-loop.sh` 기본 플래그 없음. `ai-task` 트리거 유지. 덮어쓰기는 env만 |
| L-3 | P2 | 사람 | Report cron·worktree 자동화 없음 | 후순위. 맞음 |
| L-1 잔여 | P2 | 사람 | `run:local` 러너 | 클라우드 스모크와 별개 |

### 어떻게 강화할지

**L-2** — AC는 #83으로 Open에 있음. 다음이 B-006 AI Task 한 사이클. B-002는 착수하지 않음.

**L-4** — 공개를 유지한다면 플래그를 줄이거나, 루프 트리거를 더 좁힌다 (`workflow_dispatch`만 등). 이슈에 “머지해”를 쓰지 않는다. self-hosted는 공개 레포에서 쓰지 않는다 ([`RUNNERS.md`](./RUNNERS.md)).

**L-3** — 제품 루프가 습관이 된 뒤.

하지 말 것: Cursor 자기 Pre-PR 후 사람 없이 merge. Claude PR APPROVE. 전 앱 한 verify.

---

## 강화 순서 (한 줄씩)

1·2(ruleset, 클라우드 루프)는 끝났다. 다음을 “H-1 끝날 때까지 금지”하지 않는다.

| 순서 | ID | 층 | 하는 일 | 끝났을 때 | 담당 |
|------|----|-----|---------|-----------|------|
| 1 | ~~H-1~~ | 하네스 | ruleset 필수 체크 | **완료 2026-10-21** | — |
| 2 | ~~L-1 클라우드~~ | 루프 | Secrets·`ai-task`·클라우드 1회 | **완료 issue-39 / PR #44** | — |
| 3 | 6.2 | 하네스 | 루프 PAT ≠ `@SHIN96BC` | 봇이 `biome.json`을 넣은 PR은 owner-gate 실패, 소유자 Approve 후 통과 | 사람 |
| 4 | H-2 | 하네스 | B-002 시크릿 이전 후 allowlist 축소 | `guard:harness`가 그 이름에 fail | 사람 |
| 5 | ~~L-2 AC~~ | 루프 | 제품 BACKLOG 한 줄 | **완료 #83 B-006 AC**. 사이클은 후속 | 사람+에이전트 |
| 6 | ~~H-4~~, ~~H-3~~ | 하네스 | login/print e2e, schema 가드 | H-3 **#76**. H-4 **#62 #66 #83** | — |
| 7 | ~~C-1~~, ~~C-3~~, L-4 | 둘 | AGENTS 슬림, 인덱스 | **완료 #56 #83**. L-4 hosted env 덮어쓰기는 유지 | — |
| 8 | ~~H-5~~, ~~C-2~~ | 둘 | 가드 skip 출처, 보안 메모 정식화 | **완료 #81 / #78** | 사람 승인 |

5(L-2 AC)·6(H-4)·7(C-3)은 #83에서 닫혔다. 현실 완성 8.5/8.3은 **3(6.2 스모크)** 와 **B-006 루프 사이클**이 남는다. H-2(B-002)는 그 위다.

---

## 범위 밖 (지금은 안 함)

- 7개 lite 앱 e2e 승격 · 앱별 `verify-<app>.yml`
- `snap`을 CI 기본에 넣을지
- Report cron, worktree 자동화
- Jest 커버리지 % 게이트
- `run:local` 셀프 호스티드 (공개 레포면 금지)

이 항목은 제품 루프가 습관이 된 뒤에 고른다.

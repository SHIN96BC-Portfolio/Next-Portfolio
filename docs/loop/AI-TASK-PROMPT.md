# AI Task 프롬프트 작성법

이슈 본문 = **루프에 들어가는 프롬프트**.  
Claude(Plan/Pre-PR)와 Cursor(Build)가 `.ai/issue.md`로 그대로 읽는다.  
폼 자체: [`.github/ISSUE_TEMPLATE/ai-task.yml`](../../.github/ISSUE_TEMPLATE/ai-task.yml)  
셋업·env·러너: [`ISSUE-GUIDE.md`](./ISSUE-GUIDE.md) · [`RUNNERS.md`](./RUNNERS.md)

---

## 0. 30초 요약

1. 템플릿 **AI Task**로 이슈 생성  
2. **Loop config yaml**을 정확히 채운다 (기계가 파싱)  
3. **Goal** = 한 가지 목표 + 범위 + 금지  
4. **AC** = 체크 가능한 관측 (Behavior / Unit / E2E / Gate)  
5. 한 이슈 = 한 PR 크기  
6. 라벨: 클라우드 `ai-task` / 로컬 `run:local`→`ai-task`

잘 쓴 이슈 → Plan이 짧고 Build가 한 방향으로 가고 Pre-PR이 AC로 판정한다.  
못 쓴 이슈 → 범위 폭발, denylist 건드릴 위험, REJECT 반복.

---

## 1. 루프가 이슈를 어떻게 읽는가

```text
이슈 본문
  ├─ Loop config (yaml)  → ACTIVE_APP / VERIFY_CMD / BACKLOG / Build 모델
  ├─ Goal + AC + Out of scope → .ai/issue.md (Plan·Build·Pre-PR 공통 입력)
  └─ (파서가 못 읽는 잡담) → 노이즈만 증가
```

| 단계 | 누가 | 이슈에서 특히 쓰는 것 |
|------|------|------------------------|
| Plan | Claude | Goal, AC, Out of scope, backlog → `.ai/plan.md`만 작성 |
| Build | Cursor | plan + AC + (있으면) review REJECT 목록 |
| verify | 기계 | `verify` 명령 + `guard:tests` / denylist |
| Pre-PR | Claude | AC 체크리스트 vs diff·verify 로그 → `PASS_TO_HUMAN` \| `REJECT` |

**이슈에 “머지해 / APPROVE해”를 쓰지 말 것.** 사람은 PR에서만 APPROVE.

---

## 2. 필드별 작성법 (프롬프트 엔지니어링)

### 2.1 제목

```text
[ai] <짧은 동사구> — <대상>
[ai] B-003 GNB mapper null 가드
```

- 백로그 id가 있으면 제목에 넣기  
- “개선”, “리팩터 전반”, “버그 수정”만 있는 제목 금지

### 2.2 Loop config (기계용 — 최우선)

```yaml
app: @apps/user-portfolio
verify: pnpm verify:portfolio
backlog: B-003
cursor_build_model:
```

| 키 | 프롬프트 관점 | 파서 규칙 (`ai-loop-parse-issue`) |
|----|----------------|-------------------------------------|
| `app` | 에이전트 작업 공간. 틀리면 잘못된 게이트·경로 | `app-gates.mjs`에 있는 filter만. 드롭다운과 달라도 **yaml 우선** |
| `verify` | AC Gate와 같은 문자열 (`pnpm verify:<short>`) | 레지스트리 밖·이상한 문자열이면 **portfolio로 harden** |
| `backlog` | 예산·WIP·BACKLOG AC와 한 줄 | 없으면 budget 키 = `issue-<n>` |
| `cursor_build_model` | Build≠Review 모델 분리 | 비우면 계정 기본. 레포 Variable `CURSOR_BUILD_MODEL`이 있으면 전 실행 override |

드롭다운 App scope와 yaml이 다르면 **yaml이 이긴다**. yaml을 진실의 원천으로 유지.

### 2.3 Goal — “무엇을 / 왜 / 어디까지 / 하지 말 것”

좋은 Goal은 네 덩어리를 한 덩어리로:

```markdown
무엇을: `/ko` 홈에서 gnb가 null이어도 500이 나지 않는다.
왜: 서버 부분 장애 시 랜딩이 죽어 SEO·신뢰에 타격.
어디: `entities/site/model/mapper/map-server-gnb-to-client.ts` (+ test).
하지 말 것: next-auth, cookie, 타 앱, UI 리디자인.
```

**안티패턴**

| 나쁜 Goal | 문제 |
|-----------|------|
| “헤더를 더 좋게” | 관측 불가 → Build가 자유 해석 |
| “FSD 전체 정리” | 한 PR이 아님 → budget·REJECT |
| “시크릿/auth 고치기” | denylist → 사람 게이트 필요, 루프만으로 금지 |
| 파일 경로 0개 + “알아서” | Plan이 레포 전체를 스캔하며 산만해짐 |

### 2.4 Acceptance criteria — Pre-PR이 채점하는 시험지

각 줄은 **통과/실패를  extrinsic하게** 말할 수 있어야 한다.

필수 골격:

```markdown
- [ ] Behavior: <사용자/시스템이 보는 결과> (경로·locale 포함)
- [ ] Unit: <파일명.test.ts> 케이스 <무엇> 추가·통과
- [ ] E2E: <스펙> 갱신 또는 `e2e-skip: <사유>`
- [ ] Gate: `pnpm verify:portfolio` 통과
- [ ] denylist 경로 미변경
```

작성 규칙:

1. **Behavior**에 “잘”, “적절히”, “리팩터됨” 금지 → 구체 상태  
2. **Unit** — mapper/utils/hooks/validations를 건드리면 반드시. [`TESTING.md`](../harness/TESTING.md)  
3. **E2E** — `pages` / `app/**/page` / `widgets` 변경 시 스펙 또는 `e2e-skip:`  
4. **Gate** 명령은 Loop config `verify`와 동일 문자열  
5. AC 줄 수 3~7줄. 10줄 넘으면 이슈를 쪼개라

### 2.5 Out of scope — 네거티브 프롬프트

에이전트는 “안 적어 둔 것”을 확장한다. 명시한 금지가 안전벨트다.

```markdown
- denylist: auth, cookie, deploy YAML
- 타 앱 (commerce, admin-*)
- i18n 키 대량 추가
- 의존성 major 업
```

### 2.6 Confirm 체크

템플릿 확인란: merge는 사람, 시크릿을 이슈에 안 넣음.  
시크릿·토큰·`.env` 내용을 Goal/AC에 붙여 넣지 말 것.

---

## 3. 작업 유형별 템플릿

### A. Bugfix (로직)

```yaml
app: @apps/user-portfolio
verify: pnpm verify:portfolio
backlog:
cursor_build_model:
```

```markdown
Goal:
재현: `/ko`에서 … 하면 … 된다 (기대: …).
수정 위치 가설: `…/foo.ts`의 ….
범위: 해당 파일 + 테스트. UI 리디자인 없음.

AC:
- [ ] Behavior: 위 재현 절차에서 기대 결과
- [ ] Unit: `foo.test.ts`에 회귀 케이스
- [ ] Gate: pnpm verify:portfolio
- [ ] denylist 미변경

Out of scope: auth, 타 라우트 리팩터
```

### B. Feature (작은 UI + 로직)

```markdown
Goal:
`/ko/resume`에 … 버튼 추가. 클릭 시 ….
FSD: feature `…` 또는 widget `…` (pages는 조립만).
범위: 해당 슬라이스 + i18n 키 최소.

AC:
- [ ] Behavior: `/ko/resume`에서 버튼 라벨 … 보이고 클릭 시 …
- [ ] Unit: 순수 로직/mapper 있으면 *.test.ts
- [ ] E2E: smoke 또는 전용 스펙에 경로 커버
- [ ] Gate: pnpm verify:portfolio
- [ ] denylist 미변경
```

### C. Refactor (동작 동일)

```markdown
Goal:
`map-server-*-to-client` 중복을 shared util로 추출. 공개 동작 동일.
범위: mapper + test. API/DTO 스키마 변경 없음.

AC:
- [ ] Behavior: 기존 `/ko`·관련 라우트 육안/스모크 동일
- [ ] Unit: 기존 테스트 유지 + 추출 util 테스트
- [ ] e2e-skip: 라우트·위젯 파일 미변경
- [ ] Gate: pnpm verify:portfolio
- [ ] denylist 미변경
```

### D. Docs / harness only

```markdown
Goal:
docs/loop/FOO.md에 … 절 추가. 앱 코드 변경 없음.

AC:
- [ ] Behavior: 문서에 … 절이 보인다
- [ ] Gate: (앱 verify 불필요 시) 이슈에 명시 — 보통 portfolio 루프 말고 수동 PR
```

> docs-only는 `ai-task` 루프 대신 사람이 PR하는 편이 싸다. 루프를 쓸 거면 `app`/`verify`를 그래도 맞춰라.

### E. Hotfix (좁게)

Goal에 **재현·영향 사용자·롤백 힌트**를 넣고, Out of scope를 더 공격적으로.

---

## 4. 좋은 프롬프트 vs 나쁜 프롬프트

| | 좋음 | 나쁨 |
|---|------|------|
| 크기 | 반나절~1일 PR | “모노레포 전체 정리” |
| 동사 | “null이면 빈 배열 반환” | “견고하게” |
| 경로 | FSD 슬라이스·파일 | “적당한 곳” |
| 성공 | verify AC + verify verify 명령 | “알아서 테스트” |
| 제약 | Out of scope + denylist | 침묵 |
| 언어 | 한국어 OK (레포 관행) | 이슈마다 다른 톤·이모지 장황 |

**한 줄 테스트:**  
“이 AC만 보고 다른 개발자가 머지 버튼을 눌러도 되는가?” → No면 다시 써라.

---

## 5. 완성 예시 (복붙)

**Title:** `[ai] B-003 map-server-gnb-to-client null 가드`

**Loop config:**

```yaml
app: @apps/user-portfolio
verify: pnpm verify:portfolio
backlog: B-003
cursor_build_model:
```

**Goal:**

```text
서버 GNB 응답이 null/부분 객체여도 map-server-gnb-to-client가 throw하지 않고
빈 client GNB 모델을 반환하게 한다. /ko 랜딩이 500으로 죽지 않게 하기 위함.
터치: apps/user/portfolio/.../map-server-gnb-to-client.ts 와 동명 .test.ts 만.
```

**AC:**

```markdown
- [ ] Behavior: gnb mock null이어도 `/ko` SSR/CSR이 500 아님 (빈 내비 허용)
- [ ] Unit: map-server-gnb-to-client.test.ts — null, {}, 부분 items 케이스
- [ ] e2e-skip: 페이지·위젯 파일 미변경
- [ ] Gate: pnpm verify:portfolio
- [ ] denylist 미변경
```

**Out of scope:**

```text
next-auth, cookie, proxy auth, GNB UI 리디자인, 타 앱
```

---

## 6. 제출 전 체크리스트

- [ ] Loop config `app` / `verify`가 레지스트리와 맞음 (`pnpm verify:app --list`)
- [ ] Goal에 무엇·범위·금지가 있음
- [ ] AC가 관측 가능하고 Unit/E2E/Gate가 빠지지 않음
- [ ] 한 PR 크기 (애매하면 이슈 2개)
- [ ] 시크릿·실토큰 없음
- [ ] `STATE.md` → `loop: running`
- [ ] 러너: 클라우드=`ai-task` / 로컬=`run:local` 먼저

---

## 7. 관련

| 문서 | 내용 |
|------|------|
| [`ISSUE-GUIDE.md`](./ISSUE-GUIDE.md) | env·트리거·실패 result 코드 |
| [`TESTING.md`](../harness/TESTING.md) | guard:tests / Jest·E2E 강제 |
| [`LOOP.md`](./LOOP.md) | 역할·PASS_TO_HUMAN |
| [`plan-change` 스킬](../../.cursor/skills/plan-change/SKILL.md) | AC 작성 스킬 |
| [`DESIGN.md`](./DESIGN.md) §1 | 프롬프트 층 설계 메모 |

# scripts/ — 하네스·루프 스크립트 지도

`package.json` 은 JSON 이라 주석을 못 단다. **각 스크립트가 왜 있는지**는 여기와 파일 상단 주석이 SoT.

관련 문서: [`docs/harness/README.md`](../docs/harness/README.md) · [`docs/loop/`](../docs/loop/)

## 한눈에

| pnpm 명령 | 구현 파일 | 하는 일 |
|-----------|-----------|---------|
| `verify:portfolio` 등 | `verify-app.mjs` + `app-gates.mjs` | 앱별 합격 게이트 (full/lite) |
| `verify:app --list` | 同上 | 레지스트리 표 출력 |
| `verify:portfolio:snap` | verify-app `--snap` | full verify + 라우트 스크린샷 |
| `guard:harness` | `guard-harness.mjs` | NEXT_PUBLIC secret + denylist diff |
| `guard:harness:strict` | 同上 `--strict-denylist` | denylist hit → fail |
| `guard:tests` | `guard-tests.mjs` | 새 로직 → Jest / 조건부 E2E |
| `loop:status` | `loop-status.mjs` | STATE kill switch (paused=exit 2) |
| `loop:lock` / `unlock` | `loop-lock.mjs` / `loop-unlock.mjs` | `.cache/loop.lock` 동시성 |
| `loop:budget` | `loop-budget.mjs` | 항목별 attempts/rejects 상한 |
| `loop:parse-issue` | `ai-loop-parse-issue.mjs` | 이슈 본문 → ACTIVE_APP/VERIFY_CMD… |
| `snap -- /ko` | `snap-route.mjs` | L3 스크린샷 (verify 기본 아님) |
| (Actions) | `ai-loop.sh` | Plan→Build→verify→Pre-PR 본체. `VERIFY_CMD`가 이미 `guard:harness`를 포함해도, 루프는 guard를 **한 번 더** 돌려 로그(`.ai/guard.log`)를 남긴다 |
| (Actions) | `ai-loop-state.mjs` | STATE.md WIP set/clear |

## 게이트 (verify)

```text
app-gates.mjs     ← 앱 표 (filter / maturity / snapRoutes)
       ↓
verify-app.mjs    ← typecheck → biome → test? → guard → guard:tests? → e2e? → build → snap?
       ↓
pnpm verify:<short>
```

- **full** (지금 portfolio만): e2e + guard:tests 필수 — 상세 [`docs/harness/README.md`](../docs/harness/README.md)
- **lite** (나머지): e2e 선택. 승격은 [`docs/loop/ROADMAP.md`](../docs/loop/ROADMAP.md)

## 루프 (Actions / 로컬)

```text
.github/workflows/ai-loop.yml
       ↓
scripts/ai-loop.sh
  ├─ ai-loop-parse-issue.mjs  → .ai/parsed.env
  ├─ loop:status / lock / budget
  ├─ ai-loop-state.mjs        → STATE WIP
  ├─ claude Plan → .ai/plan.md
  ├─ agent Build
  ├─ VERIFY_CMD + guard:harness
  └─ claude Pre-PR → PASS_TO_HUMAN | REJECT
```

`.ai/` 는 artifact 전용(gitignore). 레포 SoT 이력은 `docs/loop/loop-run-log.md`.

## 루트 package.json 스크립트 그룹

### 앱 개발

- `dev:<app>` / `start:<app>` — turbo filter 로 해당 앱만
- `build` / `build:libs` — 전체 / `@core/*`
- `lint` / `typecheck` / `test` — turbo 전역

### 품질·FSD

- `biome` — Biome + FSD private-folder + folder-structure lint
- `lint:fsd` / `lint:fsd:dry` — 폴더 구조만
- `lint:fix` — biome --write

### 하네스·루프 (위 표)

`guard:*` · `verify:*` · `loop:*` · `snap`

### 기타

- `gen:i18n` / `gen:graphql` — 앱 filter 위임
- `crypto:debug` — cookie crypto 디버그
- `prepare` — husky

## GitHub 설정 파일 (주석은 각 파일 상단)

| 파일 | 역할 |
|------|------|
| `.github/workflows/ai-loop.yml` | AI 루프 오케스트레이터 (cloud/local) |
| `.github/workflows/verify-portfolio.yml` | PR/push portfolio 합격 CI |
| `.github/ISSUE_TEMPLATE/ai-task.yml` | `ai-task` 이슈 폼 → 루프 입력 |

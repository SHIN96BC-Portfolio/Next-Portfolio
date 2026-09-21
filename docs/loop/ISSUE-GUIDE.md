# GitHub 이슈 → AI 루프 가이드 (운영·env)

**이슈에 무엇을 어떻게 적을지** → [`AI-TASK-PROMPT.md`](./AI-TASK-PROMPT.md) (작성 SoT)  
이 문서: 트리거·env·실패 코드 등 **운영**만.

파이프라인 계약: [`GITHUB-ACTIONS.md`](./GITHUB-ACTIONS.md) · 사람 셋업: [`ACTIONS-SETUP.md`](./ACTIONS-SETUP.md) · 러너: [`RUNNERS.md`](./RUNNERS.md)

## 1. 흐름 (이미 코드에 있음)

```text
이슈 (템플릿 AI Task) + 라벨 ai-task
  → .github/workflows/ai-loop.yml
  → Load issue → ISSUE_NUMBER / TITLE / BODY (job env)
  → scripts/ai-loop.sh
       → parse-issue → Plan → Build → verify+guard → Pre-PR
  → PASS_TO_HUMAN 이면 PR (merge APPROVE는 사람)
```

사람 사전 작업: Secrets, 라벨, `STATE.md` → `loop: running`, 브랜치 보호 → [`ACTIONS-SETUP.md`](./ACTIONS-SETUP.md)

작성자 `author_association`이 OWNER / MEMBER / COLLABORATOR 일 때만 라벨 트리거가 실행된다.

## 2. env — Secrets에 등록하지 않는 것

| 이름 | 어디서 오나 | 레포 Settings? |
|------|-------------|----------------|
| `ISSUE_NUMBER` / `ISSUE_TITLE` / `ISSUE_BODY` | 워크플로 `Load issue` (`gh issue view`) | ❌ |
| `ACTIVE_APP` / `VERIFY_CMD` / `BACKLOG_ID` / `CURSOR_BUILD_MODEL` | 이슈 Loop config → `ai-loop-parse-issue.mjs` → `.ai/parsed.env` | ❌ |
| `ACTIVE_MODE` | `ai-loop.sh`가 STATE WIP 갱신 시 (`build` 등) | ❌ |
| `BUDGET_ITEM` | backlog id 또는 `issue-<n>` | ❌ |
| `CLAUDE_CODE_OAUTH_TOKEN` / `CURSOR_API_KEY` | Actions **Secrets** | ✅ 필수 |
| `CURSOR_BUILD_MODEL` | Actions **Variables** (선택, Build 모델 기본값) | 선택 |
| `HARNESS_STRICT_DENYLIST` | Variables (`1`이면 denylist hit → CI fail) | 선택 |

로컬에서 스크립트만 수동 실행할 때:

```bash
export ISSUE_NUMBER=12
export ISSUE_BODY="$(gh issue view 12 --json body -q .body)"
# 실험용 override 예: ACTIVE_APP_OVERRIDE=@apps/user-portfolio
bash scripts/ai-loop.sh
```

파서 스모크:

```bash
ISSUE_BODY='...' node scripts/ai-loop-parse-issue.mjs --json
ISSUE_BODY='...' node scripts/ai-loop-parse-issue.mjs --write-env
```

## 3. 최소 작동 체크리스트

1. [`ACTIONS-SETUP.md`](./ACTIONS-SETUP.md) Secrets·보호 완료 + `STATE.md` → `loop: running`
2. Issues → **AI Task** 템플릿 — 본문은 [`AI-TASK-PROMPT.md`](./AI-TASK-PROMPT.md)
3. 라벨: 클라우드=`ai-task` / 로컬=`run:local` 먼저 후 `ai-task` ([`RUNNERS.md`](./RUNNERS.md))
4. Actions 탭·이슈 코멘트로 결과 확인 → 평소 `loop: paused`

## 4. 실패·스킵 result

이슈 코멘트 / step output `result`:

| result | 의미 | 할 일 |
|--------|------|--------|
| `PASS_TO_HUMAN` | Pre-PR 통과 + PR 생성 | 사람 리뷰·APPROVE |
| `REJECT` | AC/게이트/리뷰 실패 (재시도 소진 가능) | `.ai` artifact·budget 확인 |
| `SKIPPED_PAUSED` | `loop: paused` | STATE를 `running`으로 |
| `SKIPPED_LOCK` | 다른 루프가 lock | 대기 또는 `loop:unlock` |
| `ERROR` / `FAIL` | 파싱·plan 누락 등 | artifact `.ai/` 확인 |

## 5. 관련

| 파일 | 역할 |
|------|------|
| [`AI-TASK-PROMPT.md`](./AI-TASK-PROMPT.md) | 이슈 프롬프트 작성 SoT |
| [`.github/ISSUE_TEMPLATE/ai-task.yml`](../../.github/ISSUE_TEMPLATE/ai-task.yml) | 폼 |
| [`.github/workflows/ai-loop.yml`](../../.github/workflows/ai-loop.yml) | 트리거·env 주입 |
| [`scripts/ai-loop.sh`](../../scripts/ai-loop.sh) | 루프 본체 |
| [`scripts/ai-loop-parse-issue.mjs`](../../scripts/ai-loop-parse-issue.mjs) | 본문 → ACTIVE_APP 등 |
| [`../harness/TESTING.md`](../harness/TESTING.md) | Jest/E2E 강제 |

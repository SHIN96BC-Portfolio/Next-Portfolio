#!/usr/bin/env bash
# =============================================================================
# scripts/ai-loop.sh — AI 루프 본체 (Actions / 로컬 동일 진입점)
# =============================================================================
#
# 왜 있는가:
#   YAML은 “언제·어디서”만 담당하고, “무엇을 반복할지”는 이 스크립트가 담당한다.
#   Claude / Cursor CLI / verify / guard / STATE / budget 를 한 파이프라인으로 묶는다.
#
# 흐름:
#   1) 이슈 파싱 (app / verify / backlog / build model)
#   2) kill switch (docs/loop/STATE.md loop: paused → 즉시 종료)
#   3) concurrency lock (.cache/loop.lock)
#   4) STATE WIP 기록
#   5) Claude Plan → .ai/plan.md
#   6) 최대 MAX_ITER 회:
#        Cursor agent Build → verify+guard → Claude Pre-PR
#        PASS_TO_HUMAN 이면 break / REJECT 면 재시도
#   7) PASS_TO_HUMAN 이면 코드+run-log 커밋 준비 (PR은 워크플로가 생성)
#
# 판정 문자열:
#   PASS_TO_HUMAN — 사람에게 PR을 넘겨도 됨 (merge APPROVE 아님)
#   REJECT / FAIL / SKIPPED_PAUSED / SKIPPED_LOCK / ERROR
#
# 환경변수 (주요):
#   ISSUE_NUMBER, ISSUE_TITLE, ISSUE_BODY, MAX_ITER
#   ACTIVE_APP_OVERRIDE, VERIFY_CMD_OVERRIDE, BACKLOG_ID_OVERRIDE,
#   CURSOR_BUILD_MODEL_OVERRIDE
#   AI_LOOP_LOCAL=1          — self-hosted 러너
#   AI_LOOP_CLAUDE_FLAGS     — 기본 --dangerously-skip-permissions
#   CLAUDE_CODE_OAUTH_TOKEN, CURSOR_API_KEY
#   GITHUB_OUTPUT            — Actions step output
#
# 문서: docs/loop/GITHUB-ACTIONS.md · docs/loop/LOOP.md
# =============================================================================
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

MAX_ITER="${MAX_ITER:-3}"
ISSUE_NUMBER="${ISSUE_NUMBER:-0}"
ISSUE_TITLE="${ISSUE_TITLE:-AI task}"
ISSUE_BODY="${ISSUE_BODY:-}"
AI_LOOP_LOCAL="${AI_LOOP_LOCAL:-0}"
# Claude non-interactive 플래그. 로컬에서 더 엄격히 하려면 AI_LOOP_CLAUDE_FLAGS 로 덮어쓰기
# shellcheck disable=SC2086
CLAUDE_FLAGS=(${AI_LOOP_CLAUDE_FLAGS:---dangerously-skip-permissions})

# self-hosted 는 작업 디렉터리가 남아 .ai 잔여가 섞일 수 있음 → 매 실행 초기화
rm -rf .ai
mkdir -p .ai

if [[ "$AI_LOOP_LOCAL" == "1" ]]; then
  echo "[ai-loop] runner=self-hosted (AI_LOOP_LOCAL=1) — ensure private repo + trusted machine"
fi

# -----------------------------------------------------------------------------
# 이슈 본문 → ACTIVE_APP / VERIFY_CMD / BACKLOG_ID / CURSOR_BUILD_MODEL
# (이슈 템플릿의 Loop config yaml 또는 ### App scope 등)
# -----------------------------------------------------------------------------
ISSUE_BODY="$ISSUE_BODY" ISSUE_NUMBER="$ISSUE_NUMBER" \
  node scripts/ai-loop-parse-issue.mjs --write-env > .ai/parsed.env
set -a
# shellcheck disable=SC1091
source .ai/parsed.env
set +a

ACTIVE_APP="${ACTIVE_APP:-@apps/user-portfolio}"
VERIFY_CMD="${VERIFY_CMD:-pnpm verify:portfolio}"
BACKLOG_ID="${BACKLOG_ID:-}"
BUDGET_ITEM="${BUDGET_ITEM:-issue-${ISSUE_NUMBER}}"
CURSOR_BUILD_MODEL="${CURSOR_BUILD_MODEL:-}"

echo "[ai-loop] app=${ACTIVE_APP} verify=${VERIFY_CMD} backlog=${BACKLOG_ID:-none} budget=${BUDGET_ITEM} build_model=${CURSOR_BUILD_MODEL:-default}"

# 레포 SoT 실행 이력 (사람이/리포트가 읽음). .ai 는 artifact 전용.
append_run_log() {
  local result="$1"
  local summary="$2"
  local ts
  ts="$(date -u +"%Y-%m-%dT%H:%M")"
  {
    echo ""
    echo "### ${ts} — actions — ${BUDGET_ITEM}"
    echo "- result: ${result}"
    echo "- summary: ${summary}"
    echo "- verify: \`${VERIFY_CMD}\` (log in artifact)"
    echo "- notes: app=${ACTIVE_APP}; issue=#${ISSUE_NUMBER}; backlog=${BACKLOG_ID:-none}"
  } >> docs/loop/loop-run-log.md
}

# Actions 다음 스텝(Create PR)이 읽는 출력
set_output() {
  local result="$1"
  if [[ -n "${GITHUB_OUTPUT:-}" ]]; then
    {
      echo "result=${result}"
      echo "active_app=${ACTIVE_APP}"
      echo "verify_cmd=${VERIFY_CMD}"
      echo "budget_item=${BUDGET_ITEM}"
    } >> "$GITHUB_OUTPUT"
  fi
  echo "[ai-loop] result=${result}"
}

# -----------------------------------------------------------------------------
# Kill switch: docs/loop/STATE.md 의 loop: paused → 코드/PR 작업 금지
# exit 2 = paused (성공적 무작업), exit 1 = 파싱 오류
# -----------------------------------------------------------------------------
set +e
pnpm loop:status
status_ec=$?
set -e
if [[ "$status_ec" -eq 2 ]]; then
  echo "loop: paused — aborting AI loop"
  append_run_log "skipped_paused" "STATE.md loop: paused"
  set_output "SKIPPED_PAUSED"
  exit 0
fi
if [[ "$status_ec" -ne 0 ]]; then
  echo "loop:status failed (exit ${status_ec})"
  set_output "ERROR"
  exit 1
fi

# -----------------------------------------------------------------------------
# 동시성: 로컬+Actions 가 같은 워킹트리를 쓰거나 budget 을 공유할 때 이중 Build 방지
# (워크플로 concurrency 와 별개 — 프로세스 레벨 lock)
# -----------------------------------------------------------------------------
set +e
pnpm loop:lock
lock_ec=$?
set -e
if [[ "$lock_ec" -ne 0 ]]; then
  append_run_log "skipped_lock" "loop:lock failed"
  set_output "SKIPPED_LOCK"
  exit 0
fi

cleanup() {
  clear_wip
  pnpm loop:unlock || true
}
trap cleanup EXIT

clear_wip() {
  ACTIVE_APP="${ACTIVE_APP:-@apps/user-portfolio}" BACKLOG_ID="${BACKLOG_ID:-}" ISSUE_NUMBER="${ISSUE_NUMBER:-0}" \
    node scripts/ai-loop-state.mjs --clear-wip || true
}

# 사람이 STATE.md 를 열어 “지금 뭐 도는지” 볼 수 있게
ACTIVE_APP="$ACTIVE_APP" BACKLOG_ID="$BACKLOG_ID" ISSUE_NUMBER="$ISSUE_NUMBER" ACTIVE_MODE=build \
  node scripts/ai-loop-state.mjs --set-wip

# Claude/agent 가 읽는 이슈 스냅샷
printf "# %s\n\n%s\n\n## Meta\n\n- issue: #%s\n- app: %s\n- verify: %s\n- backlog: %s\n- budget_item: %s\n" \
  "$ISSUE_TITLE" "$ISSUE_BODY" "$ISSUE_NUMBER" "$ACTIVE_APP" "$VERIFY_CMD" "${BACKLOG_ID:-none}" "$BUDGET_ITEM" \
  > .ai/issue.md

DENYLIST_HINT="Respect docs/harness/DENYLIST.md and .cursor/skills/safe-edit. Do not edit denylist paths without human approval. Do not add NEXT_PUBLIC_*SECRET*."

# -----------------------------------------------------------------------------
# 1. Plan (Claude) — 코드 수정 금지, .ai/plan.md 만 작성
# -----------------------------------------------------------------------------
claude -p "${CLAUDE_FLAGS[@]}" \
  "You are the Plan step for this monorepo. Read .ai/issue.md, AGENTS.md, docs/loop/LOOP.md, docs/loop/BACKLOG.md, docs/harness/README.md, and relevant code.
If backlog id is set (${BACKLOG_ID:-none}), align the plan to that BACKLOG item.
Write an implementation plan to .ai/plan.md with: scope (${ACTIVE_APP}), files to change, approach, checkable acceptance criteria, denylist notes.
Gate command must be: ${VERIFY_CMD}
${DENYLIST_HINT}
Do not modify application source code." \
  > .ai/plan.log 2>&1 || true

if [[ ! -f .ai/plan.md ]]; then
  echo "Plan missing — Claude did not write .ai/plan.md"
  append_run_log "fail" "plan.md missing"
  set_output "FAIL"
  exit 1
fi

result="REJECT"
for i in $(seq 1 "$MAX_ITER"); do
  echo "=== iteration ${i}/${MAX_ITER} ==="
  # 시도 횟수 예산 (LOOP.md max_build_attempts_per_item)
  pnpm loop:budget -- --item "$BUDGET_ITEM" --attempt || true

  # ---------------------------------------------------------------------------
  # 2. Build (Cursor agent)
  #    --model 이 있으면 Claude Pre-PR 과 모델 벤더를 나눌 수 있음
  # ---------------------------------------------------------------------------
  AGENT_ARGS=(-p --force --output-format text)
  if [[ -n "$CURSOR_BUILD_MODEL" ]]; then
    AGENT_ARGS+=(--model "$CURSOR_BUILD_MODEL")
  fi

  agent "${AGENT_ARGS[@]}" \
    "You are Cursor Build for this monorepo (loop-build). Implement .ai/plan.md for app ${ACTIVE_APP}.
If .ai/review.md exists, fix every issue listed after the first line.
Follow AGENTS.md / FSD / Biome. One backlog-sized change only. Backlog: ${BACKLOG_ID:-none}.
${DENYLIST_HINT}
Do not edit files under .ai/ except you may read them.
Do not merge or approve any PR." \
    > ".ai/work-${i}.log" 2>&1 || true

  # ---------------------------------------------------------------------------
  # 3. 기계 게이트 — AI 판단만으로 PASS 금지
  #    VERIFY_CMD 예: pnpm verify:portfolio | pnpm verify:commerce
  # ---------------------------------------------------------------------------
  set +e
  # shellcheck disable=SC2086
  eval "$VERIFY_CMD" > .ai/verify.log 2>&1
  verify_ec=$?
  pnpm guard:harness > .ai/guard.log 2>&1
  guard_ec=$?
  set -e
  if [[ "$verify_ec" -eq 0 && "$guard_ec" -eq 0 ]]; then
    gate_ok=1
  else
    gate_ok=0
  fi

  git diff > .ai/diff.patch || true

  # ---------------------------------------------------------------------------
  # 4. Pre-PR (Claude) — 첫 줄 PASS_TO_HUMAN | REJECT 만 인정
  #    gate_ok=0 이면 모델이 PASS 해도 루프는 REJECT 유지
  # ---------------------------------------------------------------------------
  claude -p "${CLAUDE_FLAGS[@]}" \
    "You are Claude Pre-PR review (loop-verify). Do NOT modify product code.
Read .ai/issue.md, .ai/plan.md, .ai/diff.patch, .ai/verify.log, .ai/guard.log, docs/loop/BACKLOG.md.
Mechanical gate ok flag: ${gate_ok} (1=verify+guard passed). Expected gate: ${VERIFY_CMD}.
${DENYLIST_HINT}
Reply with the FIRST line exactly PASS_TO_HUMAN or REJECT.
Use REJECT if gate_ok is 0, AC unmet, denylist violation, or concrete defects.
After the first line, list concrete findings only." \
    > .ai/review.md 2>.ai/review-stderr.log || true

  verdict="$(head -1 .ai/review.md 2>/dev/null | tr -d '\r' || true)"
  if [[ "$gate_ok" = 1 ]] && echo "$verdict" | grep -q '^PASS_TO_HUMAN$'; then
    result="PASS_TO_HUMAN"
    break
  fi

  pnpm loop:budget -- --item "$BUDGET_ITEM" --reject || true
  result="REJECT"
done

set_output "$result"
append_run_log "$result" "issue #${ISSUE_NUMBER} after loop (max ${MAX_ITER})"

# PR에 active_mode: build 잔여가 남지 않게 커밋 전에 clear
clear_wip

if [[ "$result" == "PASS_TO_HUMAN" ]]; then
  {
    echo "Closes #${ISSUE_NUMBER}"
    echo ""
    echo "## Meta"
    echo "- app: \`${ACTIVE_APP}\`"
    echo "- backlog: \`${BACKLOG_ID:-none}\`"
    echo "- build model: \`${CURSOR_BUILD_MODEL:-account default}\`"
    echo ""
    echo "## Plan"
    cat .ai/plan.md
    echo ""
    echo "## Pre-PR review (Claude)"
    # 첫 줄(PASS_TO_HUMAN) 제외하고 본문만
    tail -n +2 .ai/review.md 2>/dev/null || true
    echo ""
    echo "## Gate"
    echo "- verify: \`${VERIFY_CMD}\`"
    echo "- guard:harness: ok"
    echo ""
    echo "Human: PR APPROVE / merge only after your review."
  } > .ai/pr-body.md

  # .ai/ 는 커밋하지 않음 (gitignore + 경로 제외)
  git add -A -- . ':!.ai' || true
  git add docs/loop/loop-run-log.md docs/loop/STATE.md 2>/dev/null || true
  if git diff --cached --quiet; then
    echo "No staged changes — still PASS_TO_HUMAN (empty diff?)"
  else
    git commit -m "feat: resolve #${ISSUE_NUMBER} (AI loop)"
  fi
fi

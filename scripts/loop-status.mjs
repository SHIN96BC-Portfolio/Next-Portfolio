#!/usr/bin/env node
/**
 * scripts/loop-status.mjs  (`pnpm loop:status`)
 * =============================================================================
 * Kill switch 리더 — docs/loop/STATE.md 의 `loop:` 한 줄만 본다
 * =============================================================================
 *
 * 왜 있는가:
 *   AI 루프·Cursor 스킬·사람이 “지금 돌려도 되나?”를 같은 exit code 로 판단.
 *   paused 면 코드/PR 작업을 하지 않고 조용히 멈춘다.
 *
 * Exit:
 *   0 — loop: running (진행 가능)
 *   2 — loop: paused (의도적 무작업; 실패가 아님)
 *   1 — STATE 파싱 실패 등 오류
 *
 * ai-loop.sh 는 exit 2 → SKIPPED_PAUSED, exit 1 → ERROR
 */

import { parseLoopStatus, STATE_PATH } from './loop-lib.mjs';

try {
  const status = parseLoopStatus();
  if (status === 'paused') {
    console.info(`⏸️  [loop:status] loop: paused (${STATE_PATH}) — 모든 루프 중단`);
    process.exit(2);
  }
  console.info(`▶️  [loop:status] loop: running — 진행 가능`);
  process.exit(0);
} catch (err) {
  console.error(`❌ [loop:status] ${err instanceof Error ? err.message : err}`);
  process.exit(1);
}

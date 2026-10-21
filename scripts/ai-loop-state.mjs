#!/usr/bin/env node
/**
 * scripts/ai-loop-state.mjs
 * =============================================================================
 * docs/loop/STATE.md WIP 패치 CLI (ai-loop.sh 가 호출)
 * =============================================================================
 *
 * 왜 있는가:
 *   루프 시작/종료 시 사람이 STATE.md 만 열어도
 *   “지금 어떤 이슈·앱이 도는지 / 유휴인지” 보이게 한다.
 *   실제 패치 로직은 ai-loop-parse-issue.mjs 의 setStateWip / clearStateWip.
 *
 *   --set-wip     ACTIVE_APP / BACKLOG_ID / ISSUE_NUMBER / ACTIVE_MODE
 *   --clear-wip   active_mode: none + ## WIP → _없음_
 *
 * 주의: `loop: paused|running` 킬 스위치는 절대 변경하지 않음.
 */

import { clearStateWip, setStateWip } from './ai-loop-parse-issue.mjs';

const set = process.argv.includes('--set-wip');
const clear = process.argv.includes('--clear-wip');

if (clear) {
  clearStateWip();
  console.info('[ai-loop-state] WIP cleared');
  process.exit(0);
}

if (set) {
  setStateWip({
    issueNumber: process.env.ISSUE_NUMBER || '0',
    backlogId: process.env.BACKLOG_ID || '',
    activeApp: process.env.ACTIVE_APP || '@apps/user-portfolio',
    mode: process.env.ACTIVE_MODE || 'build',
  });
  console.info('[ai-loop-state] WIP set');
  process.exit(0);
}

console.error('Usage: node scripts/ai-loop-state.mjs --set-wip | --clear-wip');
process.exit(1);

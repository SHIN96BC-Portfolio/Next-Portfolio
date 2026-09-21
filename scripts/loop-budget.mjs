#!/usr/bin/env node
/**
 * scripts/loop-budget.mjs  (`pnpm loop:budget`)
 * =============================================================================
 * 항목별 Build 시도 / Verifier REJECT 예산
 * =============================================================================
 *
 * 왜 있는가:
 *   같은 backlog/issue 를 AI 가 무한 재시도하면 비용·노이즈만 는다.
 *   LOOP.md limits 와 .cache/loop-budget.json 으로 상한을 강제한다.
 *
 * Usage:
 *   node scripts/loop-budget.mjs --item B-001           # 조회만
 *   node scripts/loop-budget.mjs --item B-001 --attempt # Build 시작 시 +1
 *   node scripts/loop-budget.mjs --item B-001 --reject  # Pre-PR REJECT 시 +1
 *   node scripts/loop-budget.mjs --item B-001 --reset   # 수동 리셋
 *
 * Exit 1: attempts > max_build_attempts_per_item
 *         또는 rejects >= max_verifier_rejects_per_item
 *   → STATE Escalations 남기고 loop: paused 권장 (정책은 LOOP.md)
 *
 * ai-loop.sh 는 매 iteration 에 --attempt, REJECT 시 --reject 호출.
 */

import { getItemBudget, parseYamlLimits, writeBudgetStore } from './loop-lib.mjs';

function parseArgs(argv) {
  const out = { item: '_default', attempt: false, reject: false, reset: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--item' && argv[i + 1]) {
      out.item = argv[++i];
    } else if (a === '--attempt') {
      out.attempt = true;
    } else if (a === '--reject') {
      out.reject = true;
    } else if (a === '--reset') {
      out.reset = true;
    }
  }
  return out;
}

const args = parseArgs(process.argv.slice(2));
const limits = parseYamlLimits();
const { store, key, entry } = getItemBudget(args.item);

if (args.reset) {
  store.items[key] = { attempts: 0, rejects: 0 };
  writeBudgetStore(store);
  console.info(`✅ [loop:budget] reset ${key}`);
  process.exit(0);
}

if (args.attempt) {
  entry.attempts += 1;
  writeBudgetStore(store);
}

if (args.reject) {
  entry.rejects += 1;
  writeBudgetStore(store);
}

const overAttempts = entry.attempts > limits.max_build_attempts_per_item;
const overRejects = entry.rejects >= limits.max_verifier_rejects_per_item;

console.info(
  `[loop:budget] ${key} attempts=${entry.attempts}/${limits.max_build_attempts_per_item} rejects=${entry.rejects}/${limits.max_verifier_rejects_per_item}`
);

if (overAttempts || overRejects) {
  console.error('❌ [loop:budget] 상한 초과 — STATE escalation 후 loop: paused 권장');
  process.exit(1);
}

console.info('✅ [loop:budget] 예산 내');
process.exit(0);

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
 *   node scripts/loop-budget.mjs --item B-001 --reset   # 수동 리셋 (로컬 .cache 만)
 *   node scripts/loop-budget.mjs --item issue-12 --seed < comments.txt
 *   node scripts/loop-budget.mjs --item issue-12 --marker
 *
 * Exit 1: attempts > max_build_attempts_per_item
 *         또는 rejects >= max_verifier_rejects_per_item
 *   그때 STATE.md 의 loop 를 paused 로 쓰고 Escalations 에 항목 id 를 남긴다.
 *   ai-loop.sh 는 이 exit 1 을 무시하지 않고 BUDGET_EXCEEDED 로 끝낸다.
 *
 * ai-loop.sh 는 매 iteration 에 --attempt, REJECT 시 --reject 호출.
 * 잡이 끝나도 횟수가 남도록, 이슈 코멘트의 `loop-budget item=…` 줄을 --seed 로 읽고
 * --marker 로 다시 남긴다. 더 작은 나중 줄은 횟수를 되돌리지 않는다.
 */

import fs from 'node:fs';
import {
  formatBudgetMarker,
  getItemBudget,
  latestBudgetMarker,
  markBudgetOverflow,
  parseYamlLimits,
  readBudgetStore,
  readUtf8,
  STATE_PATH,
  seedBudgetFromMarker,
  writeBudgetStore,
} from './loop-lib.mjs';

function parseArgs(argv) {
  const out = { item: '_default', attempt: false, reject: false, reset: false, seed: false, marker: false };
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
    } else if (a === '--seed') {
      out.seed = true;
    } else if (a === '--marker') {
      out.marker = true;
    }
  }
  return out;
}

const args = parseArgs(process.argv.slice(2));

if (args.seed) {
  const marker = latestBudgetMarker(fs.readFileSync(0, 'utf8'), args.item);
  if (!marker) {
    console.info(`✅ [loop:budget] seed 없음 ${args.item}`);
    process.exit(0);
  }
  writeBudgetStore(seedBudgetFromMarker(readBudgetStore(), args.item, marker));
  console.info(`✅ [loop:budget] seed ${args.item} attempts=${marker.attempts} rejects=${marker.rejects}`);
  process.exit(0);
}

if (args.marker) {
  const { key, entry } = getItemBudget(args.item);
  console.info(formatBudgetMarker(key, entry.attempts, entry.rejects));
  process.exit(0);
}

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
  const reason = overAttempts ? 'build attempts over limit' : 'verifier rejects over limit';
  const note = `${new Date().toISOString()} ${key}: ${reason}`;
  fs.writeFileSync(STATE_PATH, markBudgetOverflow(readUtf8(STATE_PATH), note));
  console.error(`❌ [loop:budget] 상한 초과 — STATE loop: paused (${reason})`);
  process.exit(1);
}

console.info('✅ [loop:budget] 예산 내');
process.exit(0);

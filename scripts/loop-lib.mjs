/**
 * scripts/loop-lib.mjs
 * =============================================================================
 * 루프 제어 스크립트 공용 헬퍼 (status / lock / unlock / budget)
 * =============================================================================
 *
 * 왜 있는가:
 *   STATE.md · LOOP.md · .cache 경로와 파서를 한곳에 모아
 *   loop-status / loop-lock / loop-budget 이 서로 다른 규칙을 쓰지 않게 한다.
 *
 * 경로:
 *   docs/loop/STATE.md        — kill switch `loop: running|paused`
 *   docs/loop/LOOP.md         — yaml limits (attempts / rejects / concurrency)
 *   .cache/loop.lock          — 프로세스 동시성 락 파일
 *   .cache/loop-budget.json   — 항목별 attempts/rejects 카운터
 *
 * 문서: docs/loop/LOOP.md · docs/loop/STATE.md
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const ROOT = path.resolve(__dirname, '..');
export const STATE_PATH = path.join(ROOT, 'docs/loop/STATE.md');
export const LOOP_PATH = path.join(ROOT, 'docs/loop/LOOP.md');
export const BUDGET_PATH = path.join(ROOT, '.cache/loop-budget.json');
export const LOCK_PATH = path.join(ROOT, '.cache/loop.lock');

export function readUtf8(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

/**
 * Kill switch 파서.
 * STATE.md yaml 펜스 안/밖 모두 `loop: running|paused` 한 줄을 찾는다.
 * 없으면 throw → loop-status exit 1
 */
export function parseLoopStatus(stateMd = readUtf8(STATE_PATH)) {
  const match = stateMd.match(/^\s*loop:\s*(running|paused)\s*$/m);
  if (!match) {
    throw new Error(`STATE.md에서 loop: running|paused 를 찾지 못했습니다: ${STATE_PATH}`);
  }
  return match[1];
}

/**
 * LOOP.md 첫 ```yaml``` 블록에서 숫자 한도 읽기.
 * 없으면 안전한 기본값 (attempts 3 / rejects 2 / concurrent 1)
 */
export function parseYamlLimits(loopMd = readUtf8(LOOP_PATH)) {
  const defaults = {
    max_build_attempts_per_item: 3,
    max_verifier_rejects_per_item: 2,
    max_concurrent_loops: 1,
  };
  const block = loopMd.match(/```yaml\n([\s\S]*?)```/);
  if (!block) return defaults;
  const out = { ...defaults };
  for (const line of block[1].split(/\r?\n/)) {
    const m = line.match(
      /^\s*(max_build_attempts_per_item|max_verifier_rejects_per_item|max_concurrent_loops):\s*(\d+)\s*$/
    );
    if (m) out[m[1]] = Number(m[2]);
  }
  return out;
}

export function ensureCacheDir() {
  const dir = path.join(ROOT, '.cache');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

/** budget JSON — 깨져 있으면 { items: {} } 로 리셋 */
export function readBudgetStore() {
  ensureCacheDir();
  if (!fs.existsSync(BUDGET_PATH)) return { items: {} };
  try {
    return JSON.parse(fs.readFileSync(BUDGET_PATH, 'utf8'));
  } catch {
    return { items: {} };
  }
}

export function writeBudgetStore(store) {
  ensureCacheDir();
  fs.writeFileSync(BUDGET_PATH, `${JSON.stringify(store, null, 2)}\n`, 'utf8');
}

/**
 * 항목 id (B-001 / issue-12) 별 attempts·rejects 엔트리 보장
 * @returns {{ store, key, entry: { attempts: number, rejects: number } }}
 */
export function getItemBudget(itemId) {
  const store = readBudgetStore();
  const key = itemId || '_default';
  if (!store.items[key]) {
    store.items[key] = { attempts: 0, rejects: 0 };
  }
  return { store, key, entry: store.items[key] };
}

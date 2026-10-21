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
 *
 * 예산 상한:
 *   markBudgetOverflow 가 STATE 본문의 `loop:` 를 paused 로 바꾸고
 *   ## Escalations 에 한 줄을 넣는다. 디스크 기록은 loop-budget 이 한다.
 *   WIP 를 지우는 쪽은 `loop:` 값을 되돌리지 않는다.
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

/**
 * STATE 본문의 kill switch 한 줄을 paused 로 바꾼다.
 * `loop: running` 과 이미 paused 인 줄 모두 paused 로 맞춘다.
 * 그 한 줄이 없으면 throw. 다른 본문(WIP, active_mode)은 그대로 둔다.
 */
export function withLoopPaused(stateMd) {
  if (!/^\s*loop:\s*(running|paused)\s*$/m.test(stateMd)) {
    throw new Error('STATE.md에서 loop: running|paused 를 찾지 못했습니다.');
  }
  return stateMd.replace(/^(\s*loop:\s*)(?:running|paused)(\s*)$/m, '$1paused$2');
}

/**
 * ## Escalations 아래에 항목을 한 줄 추가한다.
 * 자리표시자 `_없음_` 이 있으면 그 줄만 이 항목으로 바꾼다.
 * 이미 항목이 있으면 절 제목 바로 아래에 쌓는다. 같은 문장을 두 번 넣지 않는다.
 */
export function appendEscalation(stateMd, note) {
  const bullet = `- ${note}`;
  if (stateMd.includes(bullet)) return stateMd;
  if (/^_없음_\s*$/m.test(stateMd)) {
    return stateMd.replace(/^_없음_\s*$/m, bullet);
  }
  if (!/^## Escalations\s*$/m.test(stateMd)) {
    return `${stateMd.trimEnd()}\n\n## Escalations\n\n${bullet}\n`;
  }
  return stateMd.replace(/^## Escalations\s*$/m, `## Escalations\n\n${bullet}`);
}

/**
 * 예산 초과 때 STATE 에 남길 본문.
 * loop 를 paused 로 두고, Escalations 에 note 를 남긴다.
 * 호출부가 파일에 쓴다. 이 함수는 문자열만 바꾼다.
 */
export function markBudgetOverflow(stateMd, note) {
  return appendEscalation(withLoopPaused(stateMd), note);
}

const BUDGET_ITEM_RE = /^[A-Za-z0-9._-]+$/;
const BUDGET_MARKER_RE = /^loop-budget item=([A-Za-z0-9._-]+) attempts=(\d+) rejects=(\d+)$/;

/**
 * 이슈 코멘트에 남기는 예산 한 줄.
 * .cache 는 Actions VM 과 함께 사라지므로, 다음 잡은 이 줄을 읽어 횟수를 잇는다.
 */
export function formatBudgetMarker(item, attempts, rejects) {
  if (!BUDGET_ITEM_RE.test(String(item))) {
    throw new Error(`budget item 형식이 아닙니다: ${item}`);
  }
  const attemptCount = Number(attempts);
  const rejectCount = Number(rejects);
  if (!Number.isInteger(attemptCount) || attemptCount < 0 || !Number.isInteger(rejectCount) || rejectCount < 0) {
    throw new Error('budget 횟수는 0 이상의 정수여야 합니다.');
  }
  return `loop-budget item=${item} attempts=${attemptCount} rejects=${rejectCount}`;
}

/** 본문 안의 마커 줄만 모은다. 설명 문장은 무시한다. */
export function parseBudgetMarkers(text) {
  const found = [];
  for (const line of String(text ?? '').split(/\r?\n/)) {
    const match = line.trim().match(BUDGET_MARKER_RE);
    if (!match) continue;
    found.push({ item: match[1], attempts: Number(match[2]), rejects: Number(match[3]) });
  }
  return found;
}

/**
 * 한 항목의 시도·거절 최댓값.
 * 나중에 더 작은 줄이 있어도 횟수를 되돌리지 않는다.
 */
export function latestBudgetMarker(text, item) {
  const rows = parseBudgetMarkers(text).filter((row) => row.item === item);
  if (rows.length === 0) return null;
  return rows.reduce((best, row) => ({
    item,
    attempts: Math.max(best.attempts, row.attempts),
    rejects: Math.max(best.rejects, row.rejects),
  }));
}

/** 마커가 있으면 그 항목의 저장 횟수를 최댓값으로 올린다. 파일에는 쓰지 않는다. */
export function seedBudgetFromMarker(store, item, marker) {
  const key = item || '_default';
  const items = { ...(store?.items ?? {}) };
  const current = items[key] ?? { attempts: 0, rejects: 0 };
  if (!marker) return { items };
  items[key] = {
    attempts: Math.max(current.attempts, marker.attempts),
    rejects: Math.max(current.rejects, marker.rejects),
  };
  return { items };
}

/**
 * scripts/loop-lib.test.mjs
 * =============================================================================
 * 예산 초과 때 STATE 본문이 paused 로 바뀌는지 고정한다 (`pnpm test:harness`)
 * =============================================================================
 *
 * 왜 있는가:
 *   loop-budget 이 상한에서 exit 1 만 하고 STATE 를 그대로 두면
 *   다음 잡이 또 Build 를 시작한다. markBudgetOverflow 가
 *   `loop:` 를 paused 로 두고 Escalations 에 한 줄을 남기는지 본다.
 *   실제 docs/loop/STATE.md 는 건드리지 않는다.
 *
 * 이 파일을 비워 그 단언을 없애는 변경은 human gate 다 (DENYLIST).
 */
import assert from 'node:assert/strict';
import test from 'node:test';
import {
  appendEscalation,
  formatBudgetMarker,
  latestBudgetMarker,
  markBudgetOverflow,
  seedBudgetFromMarker,
  withLoopPaused,
} from './loop-lib.mjs';

const sample = [
  '## Status',
  '',
  '```yaml',
  'loop: running',
  'active_mode: build',
  '```',
  '',
  '## Escalations',
  '',
  '_없음_',
  '',
].join('\n');

test('withLoopPaused flips the kill switch and leaves other fields', () => {
  const next = withLoopPaused(sample);
  assert.match(next, /^loop: paused$/m);
  assert.equal(next.includes('active_mode: build'), true);
  assert.equal(next.includes('loop: running'), false);
});

test('appendEscalation replaces the empty placeholder once', () => {
  const once = appendEscalation(sample, 'issue-9: build attempts over limit');
  const twice = appendEscalation(once, 'issue-9: build attempts over limit');
  assert.equal(once.includes('_없음_'), false);
  assert.equal(once.includes('- issue-9: build attempts over limit'), true);
  assert.equal(twice.split('- issue-9:').length, 2);
});

test('budget marker keeps the higher attempt and reject counts', () => {
  const text = [
    'loop-budget item=issue-4 attempts=1 rejects=0',
    '설명 문장은 무시한다',
    'loop-budget item=issue-4 attempts=0 rejects=2',
    'loop-budget item=issue-9 attempts=3 rejects=1',
  ].join('\n');
  assert.deepEqual(latestBudgetMarker(text, 'issue-4'), { item: 'issue-4', attempts: 1, rejects: 2 });
  assert.equal(latestBudgetMarker(text, 'missing'), null);
  assert.equal(formatBudgetMarker('issue-4', 1, 2), 'loop-budget item=issue-4 attempts=1 rejects=2');
  const seeded = seedBudgetFromMarker({ items: { 'issue-4': { attempts: 2, rejects: 0 } } }, 'issue-4', {
    item: 'issue-4',
    attempts: 1,
    rejects: 2,
  });
  assert.deepEqual(seeded.items['issue-4'], { attempts: 2, rejects: 2 });
});

test('markBudgetOverflow pauses and records the item', () => {
  const next = markBudgetOverflow(sample, 'B-010: verifier rejects over limit');
  assert.match(next, /^loop: paused$/m);
  assert.equal(next.includes('- B-010: verifier rejects over limit'), true);
});

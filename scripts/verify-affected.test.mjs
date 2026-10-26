/**
 * scripts/verify-affected.test.mjs
 * =============================================================================
 * 변경 경로 → 게이트 매핑 고정 (`pnpm test:harness`)
 * =============================================================================
 */
import assert from 'node:assert/strict';
import test from 'node:test';
import { gatesForPaths, isHarnessSharedPath } from './verify-affected.mjs';

test('admin app path selects only that lite gate', () => {
  const gates = gatesForPaths(['apps/admin/master-admin/src/app/page.tsx']);
  assert.deepEqual(
    gates.map((g) => g.short),
    ['master-admin']
  );
  assert.equal(gates[0].verify, 'pnpm verify:master-admin');
});

test('core path selects verify:core and not portfolio', () => {
  const gates = gatesForPaths(['core/bc-ui/src/sheet/DataTable.tsx']);
  assert.deepEqual(
    gates.map((g) => g.short),
    ['core']
  );
});

test('portfolio plus core selects both, core first', () => {
  const gates = gatesForPaths([
    'apps/user/portfolio/src/fsd/shared/table/ui/index.ts',
    'core/bc-ui/src/table/index.ts',
  ]);
  assert.deepEqual(
    gates.map((g) => g.short),
    ['core', 'portfolio']
  );
});

test('docs/loop alone selects no gate', () => {
  assert.deepEqual(gatesForPaths(['docs/loop/STATE.md']), []);
});

test('harness scripts select core, not every app', () => {
  const gates = gatesForPaths(['scripts/verify-app.mjs', 'docs/harness/README.md']);
  assert.deepEqual(
    gates.map((g) => g.short),
    ['core']
  );
  assert.equal(isHarnessSharedPath('scripts/app-gates.mjs'), true);
  assert.equal(isHarnessSharedPath('.github/ISSUE_TEMPLATE/ai-task.yml'), false);
});

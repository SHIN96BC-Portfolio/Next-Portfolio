/**
 * scripts/ai-loop-parse-issue.test.mjs
 * =============================================================================
 * --write-env 출력이 bash source 해도 공백 있는 VERIFY_CMD 를 한 값으로 넣는지 고정
 * =============================================================================
 */
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { formatShellAssign } from './ai-loop-parse-issue.mjs';

const parser = fileURLToPath(new URL('./ai-loop-parse-issue.mjs', import.meta.url));

test('formatShellAssign quotes values that would otherwise split on source', () => {
  assert.equal(formatShellAssign('VERIFY_CMD', 'pnpm verify:portfolio'), "VERIFY_CMD='pnpm verify:portfolio'");
  assert.equal(formatShellAssign('ACTIVE_APP', '@apps/user-portfolio'), "ACTIVE_APP='@apps/user-portfolio'");
  assert.equal(formatShellAssign('BACKLOG_ID', ''), "BACKLOG_ID=''");
  assert.equal(formatShellAssign('CURSOR_BUILD_MODEL', "it's"), "CURSOR_BUILD_MODEL='it'\\''s'");
});

test('--write-env emits quoted VERIFY_CMD for the default portfolio gate', () => {
  const out = execFileSync(process.execPath, [parser, '--write-env'], {
    encoding: 'utf8',
    env: { ...process.env, ISSUE_BODY: '', ISSUE_NUMBER: '40' },
  });
  assert.match(out, /^VERIFY_CMD='pnpm verify:portfolio'$/m);
  assert.match(out, /^ACTIVE_APP='@apps\/user-portfolio'$/m);
  assert.match(out, /^BUDGET_ITEM='issue-40'$/m);
  assert.equal(out.includes('VERIFY_CMD=pnpm verify:portfolio\n'), false);
});

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
  assert.match(out, /^APP_SHORT='portfolio'$/m);
  assert.equal(out.includes('VERIFY_CMD=pnpm verify:portfolio\n'), false);
});

test('--write-env core Loop config maps to verify:core', () => {
  const out = execFileSync(process.execPath, [parser, '--write-env'], {
    encoding: 'utf8',
    env: {
      ...process.env,
      ISSUE_NUMBER: '70',
      ISSUE_BODY: ['```yaml', 'app: @core', 'verify: pnpm verify:core', '```'].join('\n'),
    },
  });
  assert.match(out, /^ACTIVE_APP='@core\/\*'$/m);
  assert.match(out, /^VERIFY_CMD='pnpm verify:core'$/m);
  assert.match(out, /^APP_SHORT='core'$/m);
});

test('--write-env App scope heading core maps to verify:core', () => {
  const out = execFileSync(process.execPath, [parser, '--write-env'], {
    encoding: 'utf8',
    env: {
      ...process.env,
      ISSUE_NUMBER: '71',
      ISSUE_BODY: [
        '### App scope',
        '',
        '@core (verify:core) [libs]',
        '',
        '```yaml',
        'app: @apps/user-portfolio',
        'verify: pnpm verify:portfolio',
        '```',
      ].join('\n'),
    },
  });
  assert.match(out, /^ACTIVE_APP='@core\/\*'$/m);
  assert.match(out, /^VERIFY_CMD='pnpm verify:core'$/m);
  assert.match(out, /^APP_SHORT='core'$/m);
});

test('--write-env APP_SHORT follows Loop config app', () => {
  const out = execFileSync(process.execPath, [parser, '--write-env'], {
    encoding: 'utf8',
    env: {
      ...process.env,
      ISSUE_NUMBER: '47',
      ISSUE_BODY: ['```yaml', 'app: @apps/user-commerce', 'verify: pnpm verify:commerce', '```'].join('\n'),
    },
  });
  assert.match(out, /^ACTIVE_APP='@apps\/user-commerce'$/m);
  assert.match(out, /^APP_SHORT='commerce'$/m);
});

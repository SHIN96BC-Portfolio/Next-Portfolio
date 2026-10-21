/**
 * scripts/harness-policy.test.mjs
 * =============================================================================
 * harness-policy 순수 함수 고정 테스트 (`pnpm test:harness`)
 * =============================================================================
 *
 * 왜 있는가:
 *   denylist 글로브, 스크립트 키 비교, CODEOWNERS 마지막 매칭,
 *   “PR 작성자가 소유자면 통과 / 봇이면 승인 필요” 가 바뀌면
 *   가드와 owner gate 가 같이 잘못된 파일을 통과시킨다.
 *   GitHub API 없이 node:test 로만 돌린다.
 *
 * 이 파일 자체도 DENYLIST 에 있다. 단언을 지워 검사를 비우는 변경은 human gate 다.
 */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';
import {
  changedProtectedScripts,
  filesMissingOwnerApproval,
  matchDenylist,
  ownersFor,
  parseCodeowners,
  parseDenylistPaths,
  resolveHarnessBaseRef,
} from './harness-policy.mjs';

test('parseDenylistPaths reads backtick paths and globs', () => {
  const md = [
    '# t',
    '',
    '- `biome.json`',
    '- `apps/**/jest.config.ts`',
    '- plain',
    '- 알려진 `NEXT_PUBLIC_*SECRET*` debt',
    '',
  ].join('\n');
  assert.deepEqual(parseDenylistPaths(md), ['biome.json', 'apps/**/jest.config.ts']);
});

test('matchDenylist covers exact, directory, and glob', () => {
  const patterns = ['.cursor/skills', '.github/workflows', 'apps/**/jest.config.ts', 'biome.json'];
  assert.equal(matchDenylist('.cursor/skills/verify/SKILL.md', patterns), true);
  assert.equal(matchDenylist('.github/workflows/verify-portfolio.yml', patterns), true);
  assert.equal(matchDenylist('apps/user/portfolio/jest.config.ts', patterns), true);
  assert.equal(matchDenylist('biome.json', patterns), true);
  assert.equal(matchDenylist('apps/user/portfolio/src/page.tsx', patterns), false);
  assert.equal(matchDenylist('docs/harness-notes.md', ['docs/harness']), false);
});

test('changedProtectedScripts flags value edits and ignores new keys', () => {
  const base = { scripts: { test: 'jest', biome: 'biome check .' } };
  const head = { scripts: { test: 'jest', biome: 'exit 0', extra: '1' } };
  assert.deepEqual(changedProtectedScripts(base, head, ['test', 'biome', 'verify:portfolio']), ['biome']);
});

test('changedProtectedScripts flags a removed gate script', () => {
  const base = { scripts: { test: 'jest' } };
  const head = { scripts: {} };
  assert.deepEqual(changedProtectedScripts(base, head, ['test']), ['test']);
});

test('base ref keeps origin branches and raw push shas', () => {
  assert.equal(resolveHarnessBaseRef('origin/master'), 'origin/master');
  assert.equal(resolveHarnessBaseRef('master'), 'origin/master');
  assert.equal(resolveHarnessBaseRef('abc1234'), 'abc1234');
  assert.equal(resolveHarnessBaseRef('a'.repeat(40)), 'a'.repeat(40));
  assert.equal(resolveHarnessBaseRef(''), null);
});

function sampleForDenylist(pattern) {
  if (!pattern.includes('*')) return pattern;
  return pattern.replaceAll('**', 'user/portfolio').replaceAll('*', 'development');
}

test('every denylist path has a CODEOWNERS owner', () => {
  const denylist = fs.readFileSync(new URL('../docs/harness/DENYLIST.md', import.meta.url), 'utf8');
  const codeowners = fs.readFileSync(new URL('../.github/CODEOWNERS', import.meta.url), 'utf8');
  const rules = parseCodeowners(codeowners);
  const missing = [];
  for (const pattern of parseDenylistPaths(denylist)) {
    const sample = sampleForDenylist(pattern);
    if (ownersFor(sample, rules).length === 0) missing.push(`${pattern} -> ${sample}`);
  }
  assert.deepEqual(missing, []);
});

test('last CODEOWNERS match wins and approval must cover every file', () => {
  const rules = parseCodeowners(['* @other', '/biome.json @SHIN96BC', '/.github/workflows/ @SHIN96BC'].join('\n'));
  assert.deepEqual(ownersFor('biome.json', rules), ['shin96bc']);
  assert.deepEqual(ownersFor('README.md', rules), ['other']);
  assert.deepEqual(ownersFor('.github/workflows/ai-loop.yml', rules), ['shin96bc']);
  assert.deepEqual(filesMissingOwnerApproval(['biome.json'], rules, ['SHIN96BC']), []);
  assert.deepEqual(filesMissingOwnerApproval(['biome.json', 'README.md'], rules, ['SHIN96BC']), ['README.md']);
  assert.deepEqual(filesMissingOwnerApproval(['unknown.txt'], [], []), ['unknown.txt']);
  assert.deepEqual(filesMissingOwnerApproval(['biome.json'], rules, [], 'SHIN96BC'), []);
  assert.deepEqual(filesMissingOwnerApproval(['biome.json'], rules, [], 'ai-loop-bot'), ['biome.json']);
});

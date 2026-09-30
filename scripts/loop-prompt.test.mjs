/**
 * scripts/loop-prompt.test.mjs
 * =============================================================================
 * Actions 프롬프트가 스킬 본문을 다시 쓰지 않는지 고정한다 (`pnpm test:harness`)
 * =============================================================================
 *
 * 왜 있는가:
 *   판정 조건을 scripts/ai-loop.sh 와 .cursor/skills 에 두 벌로 두면
 *   한쪽만 고친 채 루프가 다른 규칙을 따른다.
 *   CLAUDE.md 와 셸은 스킬 경로를 가리키기만 해야 한다.
 *   .cursor/rules 는 경로에만 붙고, FSD·denylist 본문을 다시 적지 않아야 한다.
 *
 * 이 파일을 비워 그 단언을 없애는 변경은 human gate 다 (DENYLIST).
 */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';

const claude = fs.readFileSync(new URL('../CLAUDE.md', import.meta.url), 'utf8');
const loop = fs.readFileSync(new URL('./ai-loop.sh', import.meta.url), 'utf8');

test('CLAUDE.md points Plan, Build, and Pre-PR at one skill each', () => {
  assert.match(claude, /## Plan/);
  assert.match(claude, /## Build/);
  assert.match(claude, /## Pre-PR/);
  assert.match(claude, /\.cursor\/skills\/loop-build\/SKILL\.md/);
  assert.match(claude, /\.cursor\/skills\/loop-verify\/SKILL\.md/);
});

test('path rules point at the source docs and do not restate them', () => {
  const fsd = fs.readFileSync(new URL('../.cursor/rules/fsd.mdc', import.meta.url), 'utf8');
  const gate = fs.readFileSync(new URL('../.cursor/rules/harness-denylist.mdc', import.meta.url), 'utf8');
  assert.match(fsd, /AGENTS\.md/);
  assert.match(fsd, /alwaysApply:\s*false/);
  assert.match(gate, /docs\/harness\/DENYLIST\.md/);
  assert.match(gate, /alwaysApply:\s*false/);
  assert.equal(fsd.includes('noRestrictedImports'), false);
  assert.equal(fsd.split('\n').length < 40, true);
  assert.equal(gate.split('\n').length < 80, true);
});

test('ai-loop.sh delegates rules to CLAUDE.md and the skills', () => {
  assert.match(loop, /CLAUDE\.md section Plan/);
  assert.match(loop, /loop-build\/SKILL\.md/);
  assert.match(loop, /loop-verify\/SKILL\.md/);
  assert.equal(loop.includes('Use REJECT if gate_ok'), false);
  assert.equal(loop.includes('DENYLIST_HINT'), false);
  assert.match(loop, /HARNESS_DENYLIST_HITS=/);
  const guard = fs.readFileSync(new URL('./guard-harness.mjs', import.meta.url), 'utf8');
  assert.match(guard, /HARNESS_DENYLIST_HITS=\$\{denylistHits\}/);
});

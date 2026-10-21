/**
 * scripts/ai-loop-parse-issue.mjs
 * =============================================================================
 * GitHub Issue 본문 → AI 루프 파라미터 + STATE.md WIP 헬퍼
 * =============================================================================
 *
 * 왜 있는가:
 *   이슈 템플릿(ai-task.yml) / workflow_dispatch / 로컬 실험을
 *   ai-loop.sh 가 source 할 KEY=value (.ai/parsed.env) 로 정규화한다.
 *   같은 파일에 STATE WIP set/clear 도 두어 state 스크립트가 재사용한다.
 *
 * 읽는 우선순위 (나중 값이 이김):
 *   1) ```yaml|yml|loop``` 펜스 안의 app/verify/backlog/cursor_build_model
 *   2) 본문 전역 key: value
 *   3) ### App scope / ### Backlog id 헤딩
 *   4) env OVERRIDE:
 *        ACTIVE_APP_OVERRIDE, VERIFY_CMD_OVERRIDE,
 *        BACKLOG_ID_OVERRIDE, CURSOR_BUILD_MODEL_OVERRIDE
 *
 * 출력 (--write-env):
 *   ACTIVE_APP, VERIFY_CMD, BACKLOG_ID, BUDGET_ITEM,
 *   CURSOR_BUILD_MODEL, UNKNOWN_APP
 *
 * BUDGET_ITEM: backlog id 가 있으면 그 값, 없으면 issue-<n>
 *   → loop:budget --item 과 동일 키
 *
 * CLI:
 *   ISSUE_BODY='...' node scripts/ai-loop-parse-issue.mjs --write-env
 *   ISSUE_BODY='...' node scripts/ai-loop-parse-issue.mjs --json
 *
 * 문서: docs/loop/GITHUB-ACTIONS.md
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { APP_ALIASES, APP_GATES, resolveGate } from './app-gates.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const ROOT = path.resolve(__dirname, '..');
export const STATE_PATH = path.join(ROOT, 'docs/loop/STATE.md');

const DEFAULT_FILTER = '@apps/user-portfolio';
const DEFAULTS = {
  activeApp: DEFAULT_FILTER,
  verifyCmd: APP_GATES[DEFAULT_FILTER].verify,
  backlogId: '',
  cursorBuildModel: '',
};

/**
 * @param {string} body
 * @returns {{ activeApp: string, verifyCmd: string, backlogId: string, cursorBuildModel: string, unknownApp: boolean }}
 */
export function parseIssueBody(body = '') {
  const text = String(body || '');
  const out = { ...DEFAULTS, unknownApp: false };

  // 1) yaml / loop 펜스
  const fence = text.match(/```(?:yaml|yml|loop)\s*\n([\s\S]*?)```/i);
  if (fence?.[1]) applyKv(fence[1], out);

  // 2) 본문 전역 kv (폼 extras)
  applyKv(text, out);

  // 3) ### App scope\n @apps/... (verify:…)
  const appSection = text.match(/###\s*App scope\s*\n+([^\n#]+)/i);
  if (appSection?.[1]) {
    const line = appSection[1].trim();
    const appTok = line.match(/@apps\/[\w-]+|[\w-]+/i);
    if (appTok) applyAppToken(appTok[0], out);
  }

  const backlogHeading = text.match(/###\s*Backlog id\s*\n+([^\n#]+)/i);
  if (backlogHeading?.[1]) {
    const b = backlogHeading[1].match(/B-\d+/i);
    if (b) out.backlogId = b[0].toUpperCase();
  }

  // 4) 워크플로/로컬 override
  if (process.env.ACTIVE_APP_OVERRIDE) applyAppToken(process.env.ACTIVE_APP_OVERRIDE, out);
  if (process.env.VERIFY_CMD_OVERRIDE) {
    const g = resolveGate(process.env.VERIFY_CMD_OVERRIDE);
    if (g) {
      out.activeApp = g.filter;
      out.verifyCmd = g.verify;
    }
  }
  if (process.env.BACKLOG_ID_OVERRIDE) out.backlogId = process.env.BACKLOG_ID_OVERRIDE.trim();
  if (process.env.CURSOR_BUILD_MODEL_OVERRIDE) {
    out.cursorBuildModel = process.env.CURSOR_BUILD_MODEL_OVERRIDE.trim();
  }

  // 최종: 레지스트리로 harden (모르는 앱이면 portfolio 기본 + unknownApp)
  const gate = resolveGate(out.activeApp) || resolveGate(out.verifyCmd);
  if (gate) {
    out.activeApp = gate.filter;
    out.verifyCmd = gate.verify;
    out.unknownApp = false;
  } else {
    out.unknownApp = true;
    out.activeApp = DEFAULTS.activeApp;
    out.verifyCmd = DEFAULTS.verifyCmd;
  }

  return out;
}

function applyAppToken(raw, out) {
  const gate = resolveGate(raw);
  if (gate) {
    out.activeApp = gate.filter;
    out.verifyCmd = gate.verify;
    return;
  }
  // 드롭다운 한 줄: "@apps/user-commerce (verify:commerce) [lite]"
  const cleaned = String(raw).split(/\s+/)[0];
  const g2 = resolveGate(cleaned);
  if (g2) {
    out.activeApp = g2.filter;
    out.verifyCmd = g2.verify;
  }
}

function applyKv(block, out) {
  for (const line of String(block).split(/\r?\n/)) {
    const m = line.match(
      /^\s*(app|active_app|verify|verify_cmd|backlog|backlog_id|cursor_build_model)\s*:\s*(.+?)\s*$/i
    );
    if (!m) continue;
    const k = m[1].toLowerCase();
    const v = m[2].trim();
    if (k === 'app' || k === 'active_app') applyAppToken(v, out);
    else if (k === 'verify' || k === 'verify_cmd') {
      const g = resolveGate(v) || resolveGate(`pnpm ${v}`);
      if (g) {
        out.activeApp = g.filter;
        out.verifyCmd = g.verify;
      }
    } else if (k === 'backlog' || k === 'backlog_id') {
      const b = v.match(/B-\d+/i);
      out.backlogId = b ? b[0].toUpperCase() : v;
    } else if (k === 'cursor_build_model') {
      out.cursorBuildModel = v.replace(/^["']|["']$/g, '');
    }
  }
}

/** loop:budget 키 — backlog 우선, 없으면 issue-N */
export function budgetItemId(parsed, issueNumber) {
  return parsed.backlogId || `issue-${issueNumber || 0}`;
}

/**
 * STATE.md ## WIP 블록 + yaml active_mode 갱신
 * kill switch `loop:` 줄은 건드리지 않음
 */
export function setStateWip({ issueNumber, backlogId, activeApp, mode = 'build' }) {
  let md = fs.readFileSync(STATE_PATH, 'utf8');
  const item = backlogId || `issue-${issueNumber}`;
  const updated = new Date().toISOString().slice(0, 10);

  md = md.replace(/^\s*active_mode:\s*\S+/m, `active_mode: ${mode}`);
  md = md.replace(/^\s*updated_at:\s*\S+/m, `updated_at: ${updated}`);

  const wipBlock = [
    '## WIP',
    '',
    `- item: \`${item}\``,
    `- issue: #${issueNumber}`,
    `- app: \`${activeApp}\``,
    '- source: github-actions',
    '',
  ].join('\n');

  if (/## WIP[\s\S]*?(?=## Waiting on Human)/.test(md)) {
    md = md.replace(/## WIP[\s\S]*?(?=## Waiting on Human)/, `${wipBlock}`);
  } else {
    md += `\n${wipBlock}`;
  }

  fs.writeFileSync(STATE_PATH, md, 'utf8');
}

/** PR 커밋 전에 active_mode: none + WIP 비움 */
export function clearStateWip() {
  let md = fs.readFileSync(STATE_PATH, 'utf8');
  const updated = new Date().toISOString().slice(0, 10);
  md = md.replace(/^\s*active_mode:\s*\S+/m, 'active_mode: none');
  md = md.replace(/^\s*updated_at:\s*\S+/m, `updated_at: ${updated}`);
  md = md.replace(/## WIP[\s\S]*?(?=## Waiting on Human)/, ['## WIP', '', '_없음_', '', ''].join('\n'));
  fs.writeFileSync(STATE_PATH, md, 'utf8');
}

export { APP_ALIASES, APP_GATES, resolveGate };

const isMain = process.argv[1] && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url));

if (isMain) {
  const parsed = parseIssueBody(process.env.ISSUE_BODY || '');
  const issueNumber = process.env.ISSUE_NUMBER || '0';
  const item = budgetItemId(parsed, issueNumber);

  if (process.argv.includes('--write-env')) {
    console.info(`ACTIVE_APP=${parsed.activeApp}`);
    console.info(`VERIFY_CMD=${parsed.verifyCmd}`);
    console.info(`BACKLOG_ID=${parsed.backlogId}`);
    console.info(`BUDGET_ITEM=${item}`);
    console.info(`CURSOR_BUILD_MODEL=${parsed.cursorBuildModel}`);
    console.info(`UNKNOWN_APP=${parsed.unknownApp ? '1' : '0'}`);
  } else {
    console.info(JSON.stringify({ ...parsed, budgetItem: item }, null, 2));
  }
}

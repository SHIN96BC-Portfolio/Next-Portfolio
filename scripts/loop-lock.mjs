#!/usr/bin/env node
/**
 * scripts/loop-lock.mjs  (`pnpm loop:lock`)
 * =============================================================================
 * 루프 Build 동시성 락 (.cache/loop.lock)
 * =============================================================================
 *
 * 왜 있는가:
 *   Actions concurrency 와 별개로, 같은 워킹트리에서
 *   로컬 Build + Actions / 두 Cursor 세션이 동시에 돌면
 *   budget·STATE·diff 가 섞인다. max_concurrent_loops=1 을 파일로 강제.
 *
 * 동작:
 *   1) paused 면 lock 거부 (exit 2)
 *   2) lock 파일이 있으면 거부 (exit 1) — 내용(pid/host) 출력
 *   3) flag 'wx' 로 원자적 생성 (경쟁 시 EEXIST)
 *
 * 해제: pnpm loop:unlock (ai-loop.sh trap 에서도 호출)
 */

import fs from 'node:fs';
import { ensureCacheDir, LOCK_PATH, parseLoopStatus, parseYamlLimits } from './loop-lib.mjs';

try {
  const status = parseLoopStatus();
  if (status === 'paused') {
    console.error('⏸️  [loop:lock] loop: paused — lock 거부');
    process.exit(2);
  }

  const limits = parseYamlLimits();
  ensureCacheDir();

  if (fs.existsSync(LOCK_PATH)) {
    const existing = fs.readFileSync(LOCK_PATH, 'utf8').trim();
    console.error(`❌ [loop:lock] 이미 lock 있음 (max_concurrent_loops=${limits.max_concurrent_loops})`);
    console.error(`   ${LOCK_PATH}`);
    console.error(`   ${existing}`);
    console.error('   pnpm loop:unlock 후 재시도');
    process.exit(1);
  }

  const payload = [
    `pid=${process.pid}`,
    `created_at=${new Date().toISOString()}`,
    `host=${process.env.COMPUTERNAME || process.env.HOSTNAME || 'unknown'}`,
  ].join('\n');

  // wx = exclusive create — 두 프로세스가 동시에 오면 하나만 성공
  fs.writeFileSync(LOCK_PATH, `${payload}\n`, { flag: 'wx' });
  console.info(`✅ [loop:lock] 획득 — ${LOCK_PATH}`);
  process.exit(0);
} catch (err) {
  if (err && typeof err === 'object' && 'code' in err && err.code === 'EEXIST') {
    console.error('❌ [loop:lock] 경쟁 상태에서 lock 파일이 이미 있습니다');
    process.exit(1);
  }
  console.error(`❌ [loop:lock] ${err instanceof Error ? err.message : err}`);
  process.exit(1);
}

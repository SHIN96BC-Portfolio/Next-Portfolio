#!/usr/bin/env node
/**
 * scripts/loop-unlock.mjs  (`pnpm loop:unlock`)
 * =============================================================================
 * 루프 동시성 락 해제
 * =============================================================================
 *
 * 왜 있는가:
 *   Build/Actions 종료(정상·비정상) 후 .cache/loop.lock 을 지워
 *   다음 루프가 다시 lock 을 잡을 수 있게 한다.
 *   lock 이 없어도 exit 0 (멱등) — trap / 수동 정리에 안전.
 *
 * 주의: 다른 사람/잡의 lock 을 실수로 지우지 말 것.
 *       내용의 pid/host 를 확인한 뒤 unlock.
 */

import fs from 'node:fs';
import { LOCK_PATH } from './loop-lib.mjs';

if (!fs.existsSync(LOCK_PATH)) {
  console.info('ℹ️  [loop:unlock] lock 없음 — 이미 해제됨');
  process.exit(0);
}

fs.unlinkSync(LOCK_PATH);
console.info(`✅ [loop:unlock] 해제 — ${LOCK_PATH}`);
process.exit(0);

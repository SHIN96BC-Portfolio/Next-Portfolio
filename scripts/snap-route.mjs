#!/usr/bin/env node
/**
 * scripts/snap-route.mjs  (`pnpm snap -- /ko`)
 * =============================================================================
 * 라우트 스크린샷 헬퍼 (루프 L3 / ROADMAP)
 * =============================================================================
 *
 * 왜 있는가:
 *   verify 게이트에 넣기엔 무겁고(서버·브라우저), 시각 회귀는 사람이 볼 때 유용.
 *   기본 `pnpm verify:portfolio` 에는 포함하지 않고,
 *   `pnpm verify:portfolio:snap` / VERIFY_WITH_SNAP=1 로 선택 실행.
 *
 * Usage:
 *   node scripts/snap-route.mjs /ko
 *   node scripts/snap-route.mjs /ko/resume
 *   pnpm snap -- /ko
 *
 * Env:
 *   SNAP_BASE_URL   — 기본 http://127.0.0.1:3010 (dev:portfolio)
 *   PW_CHANNEL=chrome — 시스템 Chrome (Chromium 다운로드 실패 시)
 *
 * 출력: apps/user/portfolio/e2e-results/snap/<route>.png
 */

import fs from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'apps/user/portfolio/e2e-results/snap');
const BASE = process.env.SNAP_BASE_URL || 'http://127.0.0.1:3010';

// portfolio 앱이 설치한 playwright 를 사용 (루트에 없을 수 있음)
const require = createRequire(path.join(ROOT, 'apps/user/portfolio/package.json'));
const { chromium } = require('playwright');

const routeArg = process.argv.slice(2).find((a) => a.startsWith('/'));
if (!routeArg) {
  console.error('Usage: node scripts/snap-route.mjs <route>   e.g. /ko');
  process.exit(1);
}

const route = routeArg.startsWith('/') ? routeArg : `/${routeArg}`;
const safeName = route.replace(/[^\w.-]+/g, '_').replace(/^_|_$/g, '') || 'root';
const outFile = path.join(OUT_DIR, `${safeName}.png`);

fs.mkdirSync(OUT_DIR, { recursive: true });

const launchOpts = {
  headless: true,
  ...(process.env.PW_CHANNEL === 'chrome' ? { channel: 'chrome' } : {}),
};

const browser = await chromium.launch(launchOpts);
try {
  const page = await browser.newPage({
    viewport: { width: 1280, height: 720 },
    locale: 'ko-KR',
    timezoneId: 'Asia/Seoul',
  });
  const url = `${BASE}${route}`;
  console.info(`[snap] goto ${url}`);
  await page.goto(url, { waitUntil: 'networkidle', timeout: 120_000 });
  await page.screenshot({ path: outFile, fullPage: true });
  console.info(`✅ [snap] wrote ${path.relative(ROOT, outFile)}`);
} catch (err) {
  console.error(`❌ [snap] ${err instanceof Error ? err.message : err}`);
  console.error('   Tip: pnpm --filter @apps/user-portfolio run dev 로 서버를 먼저 띄우거나 PW_CHANNEL=chrome');
  process.exitCode = 1;
} finally {
  await browser.close();
}

import { defineConfig, devices } from '@playwright/test';

const PORT = 3010;
const BASE_URL = `http://127.0.0.1:${PORT}`;

/**
 * Portfolio smoke e2e — locale/viewport/timezone 고정, MSW mock on.
 * snap/비전 검증은 범위 밖 (루프 L3).
 */
export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? 'github' : 'list',
  timeout: 60_000,
  use: {
    baseURL: BASE_URL,
    locale: 'ko-KR',
    timezoneId: 'Asia/Seoul',
    viewport: { width: 1280, height: 720 },
    trace: 'on-first-retry',
  },
  webServer: {
    command: `pnpm exec next dev -p ${PORT}`,
    url: `${BASE_URL}/ko`,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    env: {
      ...process.env,
      NEXT_PUBLIC_API_MOCKING: 'enabled',
      NEXT_PUBLIC_API_SERVER_URL: 'http://127.0.0.1:8080',
      NEXT_PUBLIC_API_AUTH_SERVER_URL: 'http://127.0.0.1:8080',
      NEXTAUTH_URL: BASE_URL,
      NEXTAUTH_SECRET: 'harness-e2e-nextauth-secret',
      NEXT_PUBLIC_COOKIE_SECRET_KEY: 'harness-e2e-cookie-secret-key',
      NEXT_PUBLIC_STORAGE_CRYPTO_SECRET_KEY: 'harness-e2e-storage-secret',
      PRIVATE_COOKIE_SECRET_KEY: 'harness-e2e-private-cookie-secret',
    },
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        // 로컬에서 Playwright 브라우저 다운로드가 막힐 때: PW_CHANNEL=chrome
        ...(process.env.PW_CHANNEL === 'chrome' ? { channel: 'chrome' as const } : {}),
      },
    },
  ],
});

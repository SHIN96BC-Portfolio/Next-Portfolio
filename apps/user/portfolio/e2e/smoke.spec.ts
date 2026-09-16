import { expect, test } from '@playwright/test';

test.describe('portfolio smoke', () => {
  test('home renders brand and site navigation', async ({ page }) => {
    await page.goto('/ko');

    await expect(page.getByRole('navigation', { name: 'site navigation' })).toBeVisible();
    await expect(page.getByRole('link', { name: '홈' }).first()).toBeVisible();
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  test('resume route exposes document header navigation', async ({ page }) => {
    await page.goto('/ko/resume');

    await expect(page.getByRole('navigation', { name: 'site navigation' })).toBeVisible();
    await expect(page.getByRole('link', { name: '경력기술서' }).first()).toBeVisible();
  });
});

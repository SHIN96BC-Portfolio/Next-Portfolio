import { expect, test } from '@playwright/test';
import enCommon from '../src/fsd/shared/config/i18n/locales/en/common.json';
import jaCommon from '../src/fsd/shared/config/i18n/locales/ja/common.json';
import koCommon from '../src/fsd/shared/config/i18n/locales/ko/common.json';

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

  test('login page shows credentials form', async ({ page }) => {
    const response = await page.goto('/ko/login');
    expect(response?.ok()).toBeTruthy();

    const { login } = koCommon;
    await expect(page.getByRole('heading', { name: login.title })).toBeVisible();
    const loginForm = page.locator('form');
    await expect(loginForm.getByText(login.email)).toBeVisible();
    await expect(loginForm.getByText(login.password)).toBeVisible();
    await expect(loginForm.locator('input[type=email]')).toBeVisible();
    await expect(loginForm.locator('input[type=password]')).toBeVisible();
    await expect(loginForm.getByRole('button', { name: login.submit })).toBeVisible();
  });

  test('en login page shows locale copy', async ({ page }) => {
    const response = await page.goto('/en/login');
    expect(response?.ok()).toBeTruthy();

    const { login } = enCommon;
    await expect(page.getByRole('heading', { name: login.title })).toBeVisible();
    const loginForm = page.locator('form');
    await expect(loginForm.getByText(login.email)).toBeVisible();
    await expect(loginForm.getByText(login.password)).toBeVisible();
    await expect(loginForm.getByRole('button', { name: login.submit })).toBeVisible();
  });

  test('ja login page shows locale copy', async ({ page }) => {
    const response = await page.goto('/ja/login');
    expect(response?.ok()).toBeTruthy();

    const { login } = jaCommon;
    await expect(page.getByRole('heading', { name: login.title })).toBeVisible();
    const loginForm = page.locator('form');
    await expect(loginForm.getByText(login.email)).toBeVisible();
    await expect(loginForm.getByText(login.password)).toBeVisible();
    await expect(loginForm.getByRole('button', { name: login.submit })).toBeVisible();
  });

  test('soft navigation from home opens interception login modal', async ({ page }) => {
    const response = await page.goto('/ko');
    expect(response?.ok()).toBeTruthy();
    await expect(page.getByRole('navigation', { name: 'site navigation' })).toBeVisible();

    const loginLink = page.getByRole('link', { name: /login/i });
    if ((await loginLink.count()) > 0) {
      await loginLink.first().click();
    } else {
      await page.evaluate(() => {
        const nextRouter = (window as typeof window & { next?: { router?: { push: (href: string) => void } } }).next
          ?.router;
        if (nextRouter?.push) {
          nextRouter.push('/ko/login');
          return;
        }
        const anchor = document.createElement('a');
        anchor.href = '/ko/login';
        document.body.appendChild(anchor);
        anchor.click();
      });
    }

    const { login } = koCommon;
    await expect(page).toHaveURL(/\/ko\/login$/);
    const loginDialog = page.getByRole('dialog');
    await expect(loginDialog).toBeVisible();
    await expect(loginDialog.getByRole('heading', { name: login.title })).toBeVisible();
    await expect(loginDialog.getByText(login.email)).toBeVisible();
    await expect(loginDialog.getByText(login.password)).toBeVisible();
    await expect(loginDialog.locator('input[type=email]')).toBeVisible();
    await expect(loginDialog.locator('input[type=password]')).toBeVisible();
    await expect(loginDialog.getByRole('button', { name: login.submit })).toBeVisible();
    await expect(page.getByRole('heading', { name: login.title })).toHaveCount(1);
  });

  test('home print route keeps heading without site navigation', async ({ page }) => {
    await page.addInitScript(() => {
      window.print = () => {};
    });
    const response = await page.goto('/ko/print');
    expect(response?.ok()).toBeTruthy();

    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.getByRole('navigation', { name: 'site navigation' })).toHaveCount(0);
  });

  test('resume print route loads document heading', async ({ page }) => {
    await page.addInitScript(() => {
      window.print = () => {};
    });
    const response = await page.goto('/ko/resume/print');
    expect(response?.ok()).toBeTruthy();

    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });
});

import { test, expect } from '@playwright/test';

test('Sample homepage test', async ({ page }) => {
  await page.goto('https://automationexercise.com');
  await expect(page).toHaveTitle('Automation Exercise');
});

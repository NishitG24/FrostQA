// tests/web/evopratorSample.test.ts

import { test } from '@playwright/test';
import { applyMockAPI } from '../../framework/frostguard/frostqa-mocks';
import { loginWithPresetSession } from '../../framework/frostguard/frostqa-state';
import { HomePage } from '../../framework/evaporator/pages/homePage';

test('Home page loads with mocked products and preset session', async ({ page }) => {
  await applyMockAPI(page);
  await loginWithPresetSession(page);

  const homePage = new HomePage(page);
  await homePage.open();

  await page.waitForTimeout(2000); // Optional visual check
});

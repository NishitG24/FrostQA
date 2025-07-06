// framework/frostguard/frostqa-mocks.ts
// This file contains mock API responses for FrostQA tests.
// The mocks are used to simulate API responses during testing, allowing for controlled test scenarios.
// The code is written in TypeScript for type safety and better development experience.
// The mock API responses can be extended as needed for different test cases.
// SPDX-License-Identifier: MIT
import { Page, Route } from 'playwright';

export async function applyMockAPI(page: Page) {
  await page.route('**/api/products', async (route: Route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([
        { id: 101, name: 'Mocked Product A' },
        { id: 102, name: 'Mocked Product B' }
      ])
    });
  });

  console.log('[FrostGuard] Mocked /api/products applied');
}

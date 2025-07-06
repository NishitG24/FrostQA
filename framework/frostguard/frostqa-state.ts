// framework/frostguard/frostqa-state.ts
// This file contains the state management functions for FrostQA tests.
// It includes functions to apply mock APIs and preset user sessions for testing purposes.
// The code is written in TypeScript for type safety and better development experience.
// The functions can be extended as needed for different test cases.
// SPDX-License-Identifier: MIT
import { Page } from 'playwright';
import { FrostFixtures } from './frostqa-fixtures';

export async function loginWithPresetSession(page: Page) {
  const { username } = FrostFixtures.users.standardUser;

  await page.addInitScript(() => {
    localStorage.setItem('loggedIn', 'true');
  });

  await page.goto('https://automationexercise.com');
  console.log(`[FrostGuard] Session preset for user: ${username}`);
}

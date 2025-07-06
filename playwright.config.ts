import { defineConfig, devices } from '@playwright/test';
import path from 'path';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',

  /* Run tests in files in parallel */
  fullyParallel: true,

  /* Fail the build on CI if test.only is committed */
  forbidOnly: !!process.env.CI,

  /* Retry on CI and optionally locally */
  retries: 1, // Retry failed tests once (feel free to make it 2 in CI)

  /* Parallel workers */
  workers: process.env.CI ? 1 : 2,

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['html', { open: 'never' }]],

  /* Shared settings for all the projects below */
  use: {
    trace: 'retain-on-failure',
    headless: true,
    viewport: { width: 1280, height: 720 },
    actionTimeout: 10000,
    baseURL: process.env.BASE_URL || 'https://automationexercise.com',

    // Per-test isolation setup (optional, for test.reset-like behavior)
    // These can also be done in `beforeEach` in your test files.
    // storageState: 'storageState.json', // Uncomment if pre-auth needed
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],

  /* Uncomment if you're using a dev server */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
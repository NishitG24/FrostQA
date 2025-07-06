import { test, expect, Page } from '@playwright/test';
const { HomePage } = require('../../framework/evaporator/pages/homePage');
test.describe('@smoke Evaporator Sample Test', () => {
test('Homepage UI test', async ({ page }: { page: Page }) => {
  const home = new HomePage(page);
  await home.open('/');
  await home.verifyLogoVisible();
  await home.goToSignup();
  await expect(page).toHaveURL("https://automationexercise.com/login");
});})

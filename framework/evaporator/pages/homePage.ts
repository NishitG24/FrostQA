// framework/evaporator/pages/homePage.ts
// This file is part of the Evaporator framework.
// It provides a page object for the home page of the application.
// SPDX-License-Identifier: Apache-2.0

const { BasePage } = require('./basePage');
import { Page } from 'playwright';

export class HomePage extends BasePage {
    // Locators for elements on the home page
    logo: any;
    signupBtn: any;
    // Constructor to initialize the page and its elements   
constructor(page: Page) {
    super(page);
    this.logo = page.locator('img[src="/static/images/home/logo.png"]');
    this.signupBtn = page.locator('a[href="/login"]');
}
  async verifyLogoVisible() {
    await this.logo.waitFor({ state: 'visible' });
  }

  async goToSignup() {
    await this.signupBtn.click();
  }
}

//module.exports = { HomePage };

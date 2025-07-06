// This file is part of the Evaporator framework.
// It provides a page object for the home page of the application.
// SPDX-License-Identifier: Apache-2.0  
import { Page } from '@playwright/test';

const { loadFrostQAConfig } = require('../../compressor/frostqa.config');

interface FrostQAConfig {
    baseUrl: string;
}

class BasePage {
    private config: FrostQAConfig;

    constructor(public page: Page) {
        this.config = loadFrostQAConfig() as FrostQAConfig;
    }
  async open(path = '/') {
    await this.page.goto(`${this.config.baseUrl}${path}`);
  }

  async click(locator: string) {
    await this.page.locator(locator).click();
  }

  async type(locator: string, text: string) {
    await this.page.locator(locator).fill(text);
  }

  async getTitle() {
    return this.page.title();
  }
}
module.exports = { BasePage };

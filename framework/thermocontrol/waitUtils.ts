// framework/thermocontrol/waitUtils.ts
// This module provides utility functions to wait for elements to become visible or to wait for a selector with specific text.
// It is designed to be used in a testing environment, such as with Playwright or Puppeteer.
// The functions include timeout options to avoid indefinite waiting.
// The functions are exported for use in other modules.
// The code is written in TypeScript for type safety and better development experience.
// The functions are asynchronous and return promises, allowing for non-blocking execution.
// The functions handle errors gracefully, providing a clear indication of what went wrong if the wait fails.
// The functions are designed to be reusable and can be easily integrated into existing test suites.
// framework/thermocontrol/waitUtils.ts
// This file is part of the Thermocontrol project, which is licensed under the MIT License
// SPDX-License-Identifier: MIT 
async function waitForElementVisible(element: { waitFor: (options: { state: 'visible'; timeout: number }) => Promise<void> }, timeout: number = 5000): Promise<void> {
    await element.waitFor({ state: 'visible', timeout });
  }
  
interface Page {
    waitForFunction: (
        pageFunction: (selector: string, text: string) => boolean,
        selector: string,
        text: string,
        options: { timeout: number }
    ) => Promise<void>;
}

async function waitForSelectorWithText(
    page: Page,
    selector: string,
    text: string,
    timeout: number = 5000
): Promise<void> {
    await page.waitForFunction(
        (sel, txt) => {
            const el = document.querySelector(sel);
            return !!el && !!el.textContent?.includes(txt);
        },
        selector,
        text,
        { timeout }
    );
}
  
  module.exports = {
    waitForElementVisible,
    waitForSelectorWithText,
  };
  
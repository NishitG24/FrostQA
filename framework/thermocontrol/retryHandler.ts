// framework/thermocontrol/retryHandler.ts
// This module provides a retry mechanism for asynchronous functions.
// It allows a function to be retried a specified number of times with a delay between attempts
// The retry mechanism is useful for handling transient errors in asynchronous operations.// The code is written in TypeScript for type safety and better development experience.
// The retry function returns a promise that resolves to the result of the function if successful, or throws the last error after all attempts have failed.
// The function is designed to be reusable and can be easily integrated into existing codebases
// The code is part of the Thermocontrol project, which is licensed under the MIT License
// SPDX-License-Identifier: MIT
interface RetryFunction {
    (): Promise<any>;
}

async function retry(fn: RetryFunction, maxRetries: number = 2, delay: number = 1000): Promise<any> {
    let lastError: unknown;
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            return await fn();
        } catch (err) {
            lastError = err;
            console.warn(`Attempt ${attempt} failed. Retrying in ${delay}ms...`);
            await new Promise<void>(r => setTimeout(r, delay));
        }
    }
    throw lastError;
}
  
  module.exports = { retry };
  
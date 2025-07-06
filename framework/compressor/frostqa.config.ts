// framework/compressor/frostqa.config.ts
// This file is part of the FrostQA framework.
// It provides configuration settings for FrostQA tests.
// SPDX-License-Identifier: Apache-2.0  
// This file is used to load the FrostQA configuration settings.
// Ensure you have a frostqa.config.js file in the root directory with the necessary settings.
// Example frostqa.config.js file:
// module.exports = {
//   baseUrl: 'http://localhost:3000',
//   timeout: 5000,
// };
// // This file exports a function to load the FrostQA configuration settings.
// // It reads from the frostqa.config.js file and returns the configuration object.
// // Ensure you have a frostqa.config.js file in the root directory with the necessary settings.
// // Example frostqa.config.js file:
// // module.exports = {
// //   baseUrl: 'http://localhost:3000',
// //   timeout: 5000,
// // };
//// Import the FrostQA environment configuration
// This file is part of the FrostQA framework.
// It provides a function to load the FrostQA configuration settings.
// SPDX-License-Identifier: Apache-2.0  
const { env: frostEnv } = require('./env');

export function loadFrostQAConfig() {
  return {
    baseUrl: frostEnv.BASE_URL,
    defaultTimeout: frostEnv.DEFAULT_TIMEOUT,
    reporter: frostEnv.REPORTER,
  };
}


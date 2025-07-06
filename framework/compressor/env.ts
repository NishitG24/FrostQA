// framework/compressor/env.ts
// This file is part of the FrostQA framework.
// It provides environment configuration for FrostQA tests.
// SPDX-License-Identifier: Apache-2.0  
//
// This file is used to set up environment variables for FrostQA tests.
// It reads from a .env file and exports the configuration object.
// Ensure you have a .env file in the root directory with the necessary variables.
// Example .env file:
// BASE_URL=https://automationexercise.com
// DEFAULT_TIMEOUT=5000
// REPORTER=html    
require('dotenv').config();  // Load .env

interface FrostEnv {
  BASE_URL: string;
  DEFAULT_TIMEOUT: number;
  REPORTER: string;
}

const env: FrostEnv = {
  BASE_URL: process.env.BASE_URL || 'https://automationexercise.com',
  DEFAULT_TIMEOUT: Number(process.env.DEFAULT_TIMEOUT || 5000),
  REPORTER: process.env.REPORTER || 'html',
};

module.exports = { env };

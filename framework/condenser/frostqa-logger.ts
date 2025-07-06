// framework/condenser/frostqa-logger.ts
// This file is part of the FrostQA framework.
// It provides a logger utility for FrostQA tests.
// SPDX-License-Identifier: Apache-2.0
// This file is used to log messages and track flaky tests in FrostQA.
// It creates a log file with a timestamp and allows logging messages and tracking flaky tests.
// Ensure you have a logs directory in the root directory where the log files will be stored.
// Example usage:
// const { FrostLogger } = require('../../framework/condenser/frostqa-logger');
// const logger = new FrostLogger('test-group');
// logger.log('This is a log message');
// logger.trackFlaky('Test Name');
import * as fs from 'fs';
import * as path from 'path';

export class FrostLogger {
  private logFilePath: string;
  private stream: fs.WriteStream;

  constructor(group = 'default') {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    this.logFilePath = path.join(__dirname, `../../logs/${group}-${timestamp}.log`);

    // Ensure logs directory exists
    fs.mkdirSync(path.dirname(this.logFilePath), { recursive: true });

    this.stream = fs.createWriteStream(this.logFilePath, { flags: 'a' });
  }

log(message: string): void {
    const time: string = new Date().toISOString();
    this.stream.write(`[${time}] ${message}\n`);
    console.log(`[FrostQA] ${message}`);
}

trackFlaky(testName: string): void {
    const flakyLogPath: string = path.join(__dirname, '../../logs/flaky-tests.log');
    fs.appendFileSync(flakyLogPath, `[${new Date().toISOString()}] ❗ Flaky Test: ${testName}\n`);
}

  close() {
    this.stream.end();
  }
}
//
//module.exports = { FrostLogger };

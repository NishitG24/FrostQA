// framework/thermocontrol/flakyManager.ts
// This module provides a mechanism to log flaky tests in a testing environment.
// It allows for the detection and logging of flaky tests, which are tests that may pass or fail intermittently.
// The logging is done to a specific file, which can be reviewed later to identify
// patterns of flakiness in tests.  
const fs = require('fs');
const path = require('path');

const flakyLogPath = path.resolve(__dirname, '../../reports/flaky-tests.log');

interface FlakyTestError {
    message: string;
}

function logFlakyTest(testName: string, err: FlakyTestError): void {
    const log = `[${new Date().toISOString()}] Flaky test detected: ${testName}\nError: ${err.message}\n\n`;
    fs.appendFileSync(flakyLogPath, log);
}

module.exports = { logFlakyTest };

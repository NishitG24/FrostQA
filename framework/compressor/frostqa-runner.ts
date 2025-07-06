 import dotenv from 'dotenv';
dotenv.config();

import { execSync } from 'child_process';
import path from 'path';
import { FrostLogger } from '../condenser/frostqa-logger';
import { AlertDispatcher } from '../smartalert/alertDispatcher';

// Get CLI arguments like --group=web
const args = process.argv.slice(2);
const groupArg = args.find(arg => arg.startsWith('--group='));
const group = groupArg ? groupArg.split('=')[1] : 'web';

// Determine test directory
const testDir = path.join('./tests', group);

// Main test runner function
function runFrostTests(group: string, testDir: string): void {
  const logger = new FrostLogger(group);
  logger.log(`🚀 Starting FrostQA tests for group: ${group}`);
  logger.log(`📁 Test directory: ${testDir}`);

  try {
    const runTests = (): boolean => {
      try {
        execSync(`npx playwright test ${testDir} --reporter=html`, { stdio: 'inherit' });
        return true;
      } catch (error) {
        return false;
      }
    };

    const firstAttemptPassed = runTests();

    if (firstAttemptPassed) {
      logger.log(`✅ Test run passed on first attempt`);
    } else {
      logger.log(`⚠️ Test run failed — retrying to check for flakiness...`);

      const secondAttemptPassed = runTests();

      if (secondAttemptPassed) {
        logger.log(`❄️ Flaky test detected: Passed on retry`);
        logger.trackFlaky(`Group: ${group}`);
      } else {
        logger.log(`💥 Test failed again — not flaky, it's broken.`);
      }
    }
  } finally {
    // ✅ Always close log and trigger alert
    logger.close();
    console.log('[FrostQA] Logger closed ✅');

    const logsPath = path.join(__dirname, '../../logs');
    console.log('[FrostQA] Dispatching summary alert...');
    AlertDispatcher.sendSummaryAlert(logsPath);
  }
}

// Run the tests
runFrostTests(group, testDir);

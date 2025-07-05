// framework/compressor/frostqa-runner.ts

const { execSync } = require('child_process');
const pathModule = require('path');
import { loadFrostQAConfig } from './frostqa.config';
const { parseCLIArgs } = require('./utils');

async function run() {
  const args = parseCLIArgs(process.argv.slice(2));
  const config = loadFrostQAConfig();

  const group = args.group || 'regression';
  const reporter = args.reporter || 'html';

  console.log(`🚀 Starting FrostQA tests for group: ${group}`);
  const testPath = pathModule.resolve(`./tests/${group}`);

  const command = `npx playwright test ${testPath} --reporter=${reporter}`;
  execSync(command, { stdio: 'inherit' });

  console.log('❄️ FrostQA execution completed.');
}

run();
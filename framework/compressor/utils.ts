// +// This script is part of the FrostQA framework and is used to run tests with Playwright.
// +// It allows for configuration through command line arguments and executes tests based on the specified group
// +// and reporter.    
interface CLIArgs {
    [key: string]: string;
}

function parseCLIArgs(argv: string[]): CLIArgs {
        const args: CLIArgs = {};
        argv.forEach(arg => {
            if (arg.startsWith('--')) {
                const [key, value] = arg.replace('--', '').split('=');
                args[key] = value || 'true';
            }
        });
        return args;
}
  
  module.exports = { parseCLIArgs };
  
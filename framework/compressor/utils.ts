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
  
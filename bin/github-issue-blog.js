#!/usr/bin/env node

const chalk = require('chalk');
const semver = require('semver');
const gib = require('../package.json');

if (!semver.satisfies(process.version, gib.engines.node)) {
  console.log(chalk.red(
    `\n[GitHub Issue Blog] minimum Node.js version not met:` +
    `\nYou are using Node ${process.version}, but GitHub Issue ` +
    `Blog requires Node.js ${gib.engines.node}. \nPlease ` +
    `upgrade your Node.js version.`
  ));
  process.exit(1);
}

const path = require('path');
const program = require('commander');
const wrapCommand = require('../src/utils/wrap-command');
const { createProject, build } = require('../src/index');

program
  .version(gib.version)
  .usage('<command> [options]');

program
  .command('create-project [targetDir]')
  .description('Create a GitHub isses blog project')
  .action(function (dir = '.') {
    wrapCommand(createProject)(path.resolve(dir));
  });

program
  .command('build [targetDir]')
  .description('build dir as static site')
  .option('-d, --dest <outDir>', `specify build output dir (default: ${chalk.green(process.cwd())}`)
  .option('--debug', 'build in development mode for debugging')
  .action(function (dir = '.', { dest, debug }) {
    const outDir = dest ? path.resolve(process.cwd(), dest) : process.cwd();
    wrapCommand(build)(path.resolve(dir), { debug, outDir });
  });

// output help information on unknown commands
program
  .arguments('<command>')
  .action(function (cmd) {
    program.outputHelp();
    console.log('    ' + chalk.red(`Unknown command ${chalk.yellow(cmd)}.`));
    console.log('');
  });

// add some useful info on help
program.on('--help', function () {
  console.log();
  console.log(`  Run ${chalk.cyan(`github-issue-blog <command> --help`)} for detailed usage of given command.`);
  console.log();
});

program.commands.forEach(c => c.on('--help', () => console.log()));

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}

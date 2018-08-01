const fs = require('fs-extra');
const chalk = require('chalk');
const inquirer = require('inquirer');

module.exports = async function (context) {
  if (fs.existsSync(context) && fs.lstatSync(context).isDirectory()) {
    const { ok } =  await inquirer.prompt([{
      name: 'ok',
      type: 'confirm',
      message: `The "${context}" directory already exists, It is clear?`
    }]);
    if (!ok) {
      console.log(chalk.green('👋 OK, Quit!'));
      process.exit(0);
    }

    fs.emptyDirSync(context);
  }

  fs.ensureDirSync(context);
};

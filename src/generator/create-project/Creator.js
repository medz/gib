const path = require('path');
const fs = require('fs-extra');
const chalk = require('chalk');
const inquirer = require('inquirer');
const gib = require('../../../package.json');

module.exports = class Creator {
  /**
   * Create the creator instance.
   * @param {string} context
   */
  constructor(context) {
    this.context = context;
    this.pkgFile = path.resolve(context, 'package.json');
  }

  /**
   * Create context dir.
   */
  async createContextDir() {
    if (!fs.existsSync(this.context) || !fs.lstatSync(this.context).isDirectory()) {
      fs.ensureDirSync(this.context);
    }
  }

  /**
   * Create package.json file.
   */
  async createPackageJson() {
    let pkg = {
      name: gib.name,
      keywords: gib.keywords,
      description: gib.description,
      private: true,
      license: gib.license
    };

    if (fs.existsSync(this.pkgFile)) {
      const { ok } = await inquirer.prompt([{
        name: 'ok',
        type: 'confirm',
        message: `The "${this.pkgFile}" file already exists, is it replaced?`
      }]);

      if (!ok) {
        console.log(chalk.green('👋 OK, Quit!'));
        process.exit(0);
      }
    }

    fs.writeJsonSync(this.pkgFile, pkg, { spaces: 2 });
  }

  async createConfigure() {
    let context = path.resolve(this.context, gib.GitHubIssueBlog.configurePath);
    
    if (!fs.existsSync(context) || !fs.lstatSync(context).isDirectory()) {
      fs.ensureDirSync(this.context);
    }

    let configurePath = path.resolve(context, 'configure.js');
  }
}
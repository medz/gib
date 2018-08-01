const path = require('path');
const fs = require('fs-extra');
const chalk = require('chalk');
const inquirer = require('inquirer');
const ejs = require('ejs');
const gib = require('../../../package.json');

module.exports = class Creator {
  /**
   * Create the creator instance.
   * @param {string} context
   */
  constructor(context) {
    this.context = context;
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
    let filename = path.resolve(this.context, 'package.json');
    if (fs.existsSync(filename)) {
      const { ok } = await inquirer.prompt([{
        name: 'ok',
        type: 'confirm',
        message: `The "${filename}" file already exists, is it replaced?`
      }]);

      if (!ok) {
        console.log(chalk.green('👋 OK, Quit!'));
        process.exit(0);
      }
    }

    let data = Object.assign({}, gib, { scripts: {
      build: `${gib.name} build`
    } });
    let pkg = await ejs.renderFile(path.resolve(__dirname, 'template/package.json.ejs'), data, { async: true });
    fs.writeJsonSync(filename, JSON.parse(pkg), { spaces: 2 });
  }

  /**
   * Create configure.js file.
   */
  async createConfigure() {
    let context = path.resolve(this.context, gib.GitHubIssueBlog.configurePath);
    
    if (!fs.existsSync(context) || !fs.lstatSync(context).isDirectory()) {
      fs.ensureDirSync(context);
    }

    let configurePath = path.resolve(context, 'configure.js');
    let configireContent = await ejs.renderFile(path.resolve(__dirname, 'template/configure.js.ejs'), gib, { async: true });
    
    fs.writeFileSync(configurePath, configireContent);
  }
}
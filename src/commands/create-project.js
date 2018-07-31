const chalk = require('chalk');
const inquirer = require('inquirer');
const Creator = require('../generator/create-project');

module.exports = async function (outDir) {
  const creator = new Creator(outDir);
  
  console.log(`🎈 Creating context...`);
  await creator.createContextDir();

  console.log(`📌 Generating package.json...`);
  await creator.createPackageJson();

  console.log(`🛠 Generating configure...`);
  await creator.createConfigure();
};

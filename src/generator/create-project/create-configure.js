const fs = require('fs-extra');
const ejs = require('ejs');
const path = require('path');
const gibpkg = require('../../../package.json');

module.exports = async function (context) {
  context = path.resolve(context, gibpkg.GitHubIssueBlog.configurePath);

  if (!fs.existsSync(context) || !fs.lstatSync(context).isDirectory()) {
    fs.ensureDirSync(context);
  }

  const configureContent = await ejs.renderFile(path.resolve(__dirname, 'template/configure.js.ejs'), gibpkg, { async: true });
  fs.writeFileSync(path.resolve(context, 'configure.js'), configureContent);
};
const fs = require('fs-extra');
const path = require('path');
const deepmerge = require('deepmerge');
const gibpkg = require('../../package.json');
const defaultConfigure = require('../configure');

module.exports = function (context) {
  const configurePath = path.resolve(context, gibpkg.GitHubIssueBlog.configurePath, 'configure.js');
  if (!fs.existsSync(configurePath)) {
    return defaultConfigure;
  }

  return deepmerge(defaultConfigure, require(configurePath));
};

const fs = require('fs-extra');
const path = require('path');
const gibpkg = require('../../../package.json');

module.exports = async function (context) {
  fs.copySync(
    path.resolve(__dirname, 'public/'),
    path.resolve(context, gibpkg.GitHubIssueBlog.configurePath, 'public/')
  );
};

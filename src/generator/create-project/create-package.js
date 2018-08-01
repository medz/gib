const fs = require('fs-extra');
const ejs = require('ejs');
const path = require('path');
const gibpkg = require('../../../package.json');

module.exports = async function (context, options) {
  const filename = path.resolve(context, 'package.json');
  const data = Object.assign({}, gibpkg, {
    scripts: {
      build: `${gibpkg.name} build`
    }
  });
  const targetpkg = await ejs.renderFile(path.resolve(__dirname, 'template/package.json.ejs'), data, { async: true });

  fs.writeJsonSync(filename, JSON.parse(targetpkg), { spaces: 2 });
};
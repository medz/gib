module.exports = async function (targetDir, { outDir, debug }) {
  const path = require('path');
  const webpack = require('webpack')

  let configure = require('../utils/load-configure')(targetDir);
  const { package: themeEntry, options: themeOptions } = configure.theme;

  // Run the theme entry.
  themeEntry(themeOptions, function (theme) {
    configure.theme = theme;
  });
  configure.themeOptions = themeOptions;
  configure.gib = require('./../../package.json');
  configure.targetDir = targetDir;
  configure.outDir = outDir;
  configure.debug = (debug !== undefined || debug !== null) ? !!debug : configure.debug;

  let webpackConfigure = require('../webpack/create-base-configure')(configure);
  webpackConfigure
    .entry('app')
      .add(path.resolve(__dirname, '../app/client-entry.js'))

  webpack(webpackConfigure.toConfig(), (err, state) => {
    console.log(state);
    console.log(err);
  });
};

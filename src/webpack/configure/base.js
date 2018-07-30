const path = require('path');
const WebpackChain = require('webpack-chain');

module.exports = function(options) {
  const isProd = process.env.NODE_ENV === 'production';
  const webpackConfigure = new WebpackChain();

  webpackConfigure
    .mode(isProd && !options.debug ? 'production' : 'development')
    .output
      .path(options.outDir)
      .filename(isProd ? 'assets/js/[name].[chunkhash:8].js' : 'assets/js/[name].js')
      .publicPath(isProd ? options.publicPath : '/');

  if (options.debug) {
    webpackConfigure.devtool('source-map');
  } else if (!isProd) {
    webpackConfigure.devtool('cheap-module-eval-source-map');
  }

  webpackConfigure
    .resolve
      .set('symlinks', true)
      .alias
        .set('@app', path.resolve(__dirname, '../../app'))
        // Theme alias register.
        .set('@theme/layout', options.theme.layout)
        .set('@theme/home', options.theme.home)
        .set('@theme/post-list', options.theme.postList)
        .set('@theme/post', options.theme.post)
        .end()
      .extensions
        .merge(['.js', '.jsx', '.vue', '.json', '.styl'])
        .end()
      .modules
        .add(path.resolve(__dirname, '../../../node_modules'))
        .add(path.resolve(__dirname, '../../../../'))
        .add('node_modules');

  return webpackConfigure;
};

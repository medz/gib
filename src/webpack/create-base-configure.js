const path = require('path');
const WebpackChain = require('webpack-chain');

module.exports = function(options) {
  const isProd = process.env.NODE_ENV === 'production';
  const inlineLimit = 10000;
  const { VueLoaderPlugin } = require('vue-loader');
  const CSSExtractPlugin = require('mini-css-extract-plugin');
  const webpackConfigure = new WebpackChain();

  webpackConfigure
    .mode(isProd && !options.debug ? 'production' : 'development')
    .output
      .path(options.outDir)
      .filename(isProd ? 'assets/js/[name].[chunkhash:8].js' : 'assets/js/[name].js')
      .publicPath(isProd ? options.publicPath : '/')
  ;

  if (options.debug) {
    webpackConfigure.devtool('source-map');
  } else if (!isProd) {
    webpackConfigure.devtool('cheap-module-eval-source-map');
  }

  webpackConfigure
    .resolve
      .set('symlinks', true)
      .alias
        .set('@app', path.resolve(__dirname, '../app'))
        // Theme alias register.
        .set('@theme/layout', options.theme.layout)
        .set('@theme/home', options.theme.home)
        .set('@theme/post-list', options.theme.postList)
        .set('@theme/post', options.theme.post)
        .set('@theme/not-found', options.theme.notFound)
        .end()
      .extensions
        .merge(['.js', '.jsx', '.vue', '.json', '.styl'])
        .end()
      .modules
        .add(path.resolve(__dirname, '../../node_modules'))
        .add(path.resolve(__dirname, '../../../'))
        .add('node_modules')
  ;

  // vue-loader
  webpackConfigure
    .module
      .rule('vue')
        .test(/\.vue$/)
        .use('vue-loader')
          .loader('vue-loader')
          .options({
            compilerOptions: {
              preserveWhitespace: true
            }
          })
  ;
    
  // babel-loader
  webpackConfigure
    .module
      .rule('js')
        .test(/\.js$/)
        .exclude
          .add(filepath => {
            if (/\.vue\.js$/.test(filepath)) {
              return false;
            }

            return /node_modules/.test(filepath);
          })
          .end()
        .use('babel-loader')
          .loader('babel-loader')
          .options({
            babelrc: false,
            presets: [
              require.resolve('@vue/babel-preset-app')
            ]
          })
  ;

  // images
  webpackConfigure
    .module
      .rule('images')
        .test(/\.(png|jpe?g|gif)(\?.*)?$/)
        .use('url-loader')
          .loader('url-loader')
          .options({
            limit: inlineLimit,
            name: `assets/images/[name].[hash:8].[ext]`
          })
  ;

  // do not base64-inline SVGs.
  // https://github.com/facebookincubator/create-react-app/pull/1180
  webpackConfigure
    .module
      .rule('svg')
        .test(/\.(svg)(\?.*)?$/)
        .use('file-loader')
          .loader('file-loader')
          .options({
            name: `assets/images/[name].[hash:8].[ext]`
          })
  ;

  // media
  webpackConfigure
    .module
      .rule('media')
        .test(/\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/)
        .use('url-loader')
          .loader('url-loader')
          .options({
            limit: inlineLimit,
            name: `assets/media/[name].[hash:8].[ext]`
          })
  ;

  // fonts
  webpackConfigure
    .module
      .rule('fonts')
        .test(/\.(woff2?|eot|ttf|otf)(\?.*)?$/i)
        .use('url-loader')
          .loader('url-loader')
          .options({
            limit: inlineLimit,
            name: `assets/fonts/[name].[hash:8].[ext]`
          })
  ;

  function createCSSRule(lang, test, loader, loaderOptions) {
    const baseRule = webpackConfigure.module.rule(lang).test(test);
    const modulesRule = baseRule.oneOf('modules').resourceQuery(/module/);
    const normalRule = baseRule.oneOf('normal');

    function applyLoaders(rule, modules) {
      if (isProd) {
        rule.use('extract-css-loader').loader(CSSExtractPlugin.loader);
      } else {
        rule.use('vue-style-loader').loader('vue-style-loader');
      }

      // css-loader
      rule.use('css-loader')
        .loader('css-loader')
        .options({
          modules,
          localIdentName: '[local]_[hash:base64:8]',
          importLoaders: 1,
          sourceMap: !isProd
        })
      ;

      // postcss-loader
      rule.use('postcss-loader').loader('postcss-loader').options(Object.assign({
        plugins: [require('autoprefixer')],
        sourceMap: !isProd
      }, options.postcss));

      if (loader) {
        rule.use(loader).loader(loader).options(loaderOptions);
      }
    }

    applyLoaders(modulesRule, true);
    applyLoaders(normalRule, false);
  }

  // .css
  createCSSRule('css', /\.css$/);
  // .pcss || .postcss
  createCSSRule('postcss', /\.p(ost)?css$/);
  // .sty || .stylus
  createCSSRule('stylus', /\.styl(us)?$/, 'stylus-loader', Object.assign({
    preferPathResolver: 'webpack'
  }, options.stylus));

  // vue-load plugin
  webpackConfigure
    .plugin('vue-loader')
    .use(VueLoaderPlugin)
  ;

  if (isProd) {
    webpackConfigure
      .plugin('extract-css')
      .use(CSSExtractPlugin, [{
        filename: 'assets/css/styles.[chunkhash:8].css'
      }])
    ;

    webpackConfigure
      .optimization
        .splitChunks({
          cacheGroups: {
            styles: {
              name: 'styles',
              test: m => /css-extract/.test(m.type),
              chunks: 'all',
              enforce: true
            }
          }
        })
    ;
  }

  // inject constants
  webpackConfigure
    .plugin('injections')
    .use(require('webpack/lib/DefinePlugin'), [{
      BASE_URL: JSON.stringify(options.publicPath || '/'),
      GIB_VERSION: JSON.stringify(options.gib.version)
    }])
  ;

  return webpackConfigure;
};

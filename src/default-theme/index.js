const path = require('path');

module.exports = function (options, setTheme) {
  setTheme({
    layout: path.resolve(__dirname, 'layout'),
    home: path.resolve(__dirname, 'home'),
    postList: path.resolve(__dirname, 'post-list'),
    post: path.resolve(__dirname, 'post'),
    notFound: path.resolve(__dirname, 'not-found'),
  });
};

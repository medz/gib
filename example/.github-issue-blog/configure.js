module.exports = {
  github: {
    username: '<Your GitHub username>',
    repository: '<Your GitHub repo name>'
    /* For example: {
     *  username: 'medz',
     *  repository: 'github-issus-blog'
     * }
     * -> https://github.com/medz/github-issue-blog
     * 💡 The repository must be under the username.
     */
  },
  debug: true,
  publicPath: '/',
  theme: {
    options: {
      name: "github-issue-blog",
      keywords: ["blog","issue-blog","github","vue","github-issue-blog"],
      description: '📝Blog creation using GitHub issues, built by Vue.js',
    }
  },
  plugins: []
};

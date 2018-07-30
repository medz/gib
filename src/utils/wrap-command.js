const chalk = require("chalk");

module.exports = function (fn) {
  return function (...args) {
    return fn(...args).catch(function (error) {
      console.log(chalk.red(error.stack));
      process.exitCode = 1;
    });
  };
};

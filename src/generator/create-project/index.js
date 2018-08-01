const wrapCommand = require('../../utils/wrap-command');
const createContext = require('./create-context');

/**
 * Generatr callable function.
 * 
 * @param {AsyncFunction} command 
 * @param {mixed} args 
 * @return AsyncFunction
 */
function generatrFn (command, ...args) {
  return async function () {
    return await wrapCommand(command)(...args);
  };
}

module.exports = async function (context) {
  await createContext(context);

  return {
    createPackage: generatrFn(require('./create-package'), context),
    createConfigure: generatrFn(require('./create-configure'), context),
    createGitigonre: generatrFn(require('./create-gitigonre'), context),
  };
};

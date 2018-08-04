const creatorGenerator = require('../generator/create-project');

module.exports = async function (targetDir) {
  const creator = await creatorGenerator(targetDir);
  console.log('Creating project...');
  
  // Create package.json
  await creator.createPackage();

  // create configure.js
  await creator.createConfigure();

  // create .gitigonre
  await creator.createGitigonre();

  // copying public
  await creator.copyingPublic();
};

const path = require('path');
const fs = require('fs-extra');
const gitignoreContent = `.DS_Store
node_modules

# Log files
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Editor directories and files
.idea
.vscode
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw*
`;

module.exports = async function (context) {
  fs.writeFileSync(path.resolve(context, '.gitignore'), gitignoreContent);
};

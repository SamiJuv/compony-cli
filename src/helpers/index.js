var fs = require('fs');
var path = require('path');

/**
 * Finds the pathname of the Drupal core folder. If no core folder is found, then
 * the parent directories are recursively searched until the folder is found or
 * the root directory is reached. Returns the pathname if found or null if not.
 */
const findDrupalRoot = (directory) => {
  if (!directory) {
    directory = path.resolve();
  }

  var coreFolder = path.resolve(directory, 'core');

  if (fs.existsSync(coreFolder) && fs.statSync(coreFolder).isDirectory()) {
      return coreFolder;
  }

  var parent = path.resolve(directory, '..');

  if (parent === directory) {
      return null;
  }

  return findDrupalRoot(parent);
}

const createFolder = (folderName) => {
  if (!fs.existsSync(folderName)) {
    fs.mkdirSync(folderName);
  }
}

const copyTemplate = (templateFile, destFolder) => {
  console.log(templateFile);
  console.log(destFolder);
}

module.exports = {
  findDrupalRoot,
  createFolder,
  copyTemplate
}
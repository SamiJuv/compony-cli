const inquirer = require("inquirer");

const { 
  findDrupalRoot,
  createFolder,
  copyTemplate,
  createStylesheetFile,
  createLibrariesFile
} = require("../helpers");
const { BLOCK_TEMPLATE_PATH } = require("../constants/templatePaths");

const createBlock = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "machineName",
        message: "Machine name of the component"
      }
    ])
    .then((answer) => {
      const drupalRoot = findDrupalRoot();
      const blockTemplate = drupalRoot + BLOCK_TEMPLATE_PATH;

      // Create component folder
      const componentName = "block--" + answer.machineName;
      createFolder(componentName);

      // Copy template file
      copyTemplate(blockTemplate, componentName);

      // Create stylesheet file
      createStylesheetFile(componentName);
      
      // Create libraries file
      createLibrariesFile(componentName);
    });
}

module.exports = createBlock;
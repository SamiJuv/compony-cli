const inquirer = require("inquirer");

const { findDrupalRoot, createFolder, copyTemplate } = require("../helpers");
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
      const folderName = "block--" + answer.machineName;
      createFolder(folderName);

      // Copy template file
      copyTemplate(blockTemplate, folderName);
    });
}

module.exports = createBlock;
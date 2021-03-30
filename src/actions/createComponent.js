const inquirer = require("inquirer");

const { COMPONENT_TYPES } = require("../constants/componentTypes");
const createBlock = require("../utils/createBlock");

const createComponent = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "componentType",
        message: "Select type of the component you want to create",
        choices: [
          ...COMPONENT_TYPES,
          {
            name: "Cancel",
            value: "cancel"
          }
        ]
      }
    ])
    .then((answer) => {
      switch (answer.componentType) {
        case "block":
          createBlock();
          break;
      }
    });
}

module.exports = {
  createComponent
}
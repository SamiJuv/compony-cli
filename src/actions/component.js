const inquirer = require("inquirer");
const { COMPONENT_TYPES } = require("../constants");

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
      console.log(answer);
    });
}

module.exports = {
  createComponent
}
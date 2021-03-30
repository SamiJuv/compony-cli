#!/usr/bin/env node

const { program } = require("commander");
const { createComponent } = require("../src/actions/createComponent");

program.version("0.0.1", "-v, --version", "output the current version");
program.description("Command line interface for managing Compony.io components");

program
  .command("create-component")
  .alias("cr")
  .description("Create new component")
  .action(() => createComponent());

program.parse(process.argv);
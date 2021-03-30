var fs = require("fs");
var path = require("path");
const Handlebars = require("handlebars");

/**
 * Finds the pathname of the Drupal core folder. If no core folder is found, then
 * the parent directories are recursively searched until the folder is found or
 * the root directory is reached. Returns the pathname if found or null if not.
 */
const findDrupalRoot = (directory) => {
  if (!directory) {
    directory = path.resolve();
  }

  var coreFolder = path.resolve(directory, "core");

  if (fs.existsSync(coreFolder) && fs.statSync(coreFolder).isDirectory()) {
      return coreFolder;
  }

  var parent = path.resolve(directory, "..");

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

const copyTemplate = (templateFile, componentName) => {
  const destinationPath = path.join(path.resolve(), componentName, componentName + ".html.twig");
  
  fs.copyFile(templateFile, destinationPath, (err) => {
    if (err) throw err;
    console.log("Successfully copied template file!");
  });
}

const createStylesheetFile = (componentName) => {
  const destinationPath = path.join(path.resolve(), componentName, componentName + ".scss");
  
  fs.writeFile(destinationPath, "", (err) => {
    if (err) throw err;
    console.log("Successfully created stylesheet file!");
  });
}

const createLibrariesFile = (componentName) => {
  const destinationPath = path.join(path.resolve(), componentName, "libraries.yml");

  const librariesYmlTemplateFile = fs.readFileSync(path.resolve(__dirname + "/../templates/librariesYmlTemplate.txt"), "utf-8");
  const librariesYmlTemplate = Handlebars.compile(librariesYmlTemplateFile);
  const librariesYmlContent = librariesYmlTemplate({ componentName: componentName });

  fs.writeFile(destinationPath, librariesYmlContent, (err) => {
    if (err) throw err;
    console.log("Successfully created libraries.yml file!");
  });
}

module.exports = {
  findDrupalRoot,
  createFolder,
  copyTemplate,
  createStylesheetFile,
  createLibrariesFile
}
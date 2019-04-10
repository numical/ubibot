const defaultContent = require("./defaultContent");
const defaultContext = require("./defaultContext");
const validateConfig = require("./validateConfig");

const config = {
  content: defaultContent,
  contexts: [defaultContext],
  scriptsDir: __dirname
};
validateConfig(config);

module.exports = Object.freeze(config);

const defaultContent = require("./defaultContent");
const DefaultContext = require("./DefaultContext");
const validateConfig = require("./validateConfig");

const config = {
  content: defaultContent,
  contexts: [new DefaultContext()]
};
validateConfig(config);

module.exports = Object.freeze(config);

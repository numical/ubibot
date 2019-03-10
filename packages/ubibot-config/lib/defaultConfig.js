const defaultContent = require("./defaultContent");
const validateConfig = require("./validateConfig");

const defaultStart = () => {
  throw new Error("config.start function not defined");
};

const config = {
  content: defaultContent,
  start: defaultStart,
  scriptsDir: __dirname
};
validateConfig(config);

module.exports = Object.freeze(config);

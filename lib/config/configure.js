const defaultConfig = require("./defaultConfig");
const validateConfig = require("./validateConfig");

let config = defaultConfig;
let getterCalled = false;

const configure = options => {
  if (options) {
    if (getterCalled) {
      throw new Error("Conguration changed after it has been read.");
    }
    config = Object.freeze({ ...config, ...options });
    validateConfig(config);
  } else {
    getterCalled = true;
  }
  return config;
};

module.exports = configure;

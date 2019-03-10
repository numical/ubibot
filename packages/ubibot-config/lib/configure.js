const { mergeDeepRight } = require("ramda");

const defaultConfig = require("./defaultConfig");
const validateConfig = require("./validateConfig");

let config = defaultConfig;
let getterCalled = false;

const configure = (options, ignoreLock) => {
  if (options) {
    if (getterCalled && !ignoreLock) {
      throw new Error("Conguration changed after it has been read.");
    }
    config = Object.freeze(mergeDeepRight(config, options));
    validateConfig(config);
  } else {
    getterCalled = true;
  }
  return config;
};

module.exports = configure;

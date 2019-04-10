const mergeDeepRight = require("ramda/src/mergeDeepRight");
const defaultConfig = require("./defaultConfig");
const validateConfig = require("./validateConfig");

let config = defaultConfig;
let getterCalled = false;

const configure = (options, allowModifyAfterGet) => {
  if (options) {
    if (getterCalled && !allowModifyAfterGet) {
      throw new Error("Conguration changed after it has been read.");
    }
    config = mergeDeepRight(config, options);
    validateConfig(config);
  } else {
    getterCalled = true;
  }
  return Object.freeze(config);
};

module.exports = configure;

const defaults = require("./default.js");
const config = require("../config/configure")();

const content = Object.freeze({
  ...defaults,
  ...config.content
});

module.exports = content;

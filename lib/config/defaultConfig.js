const validateConfig = require("./validateConfig");
const echoConfig = require("../../domain/echo/config");

const config = Object.freeze({
  ...echoConfig
});
validateConfig(config);

module.exports = config;

const path = require("path");
const content = require("./content");
const start = require("./commands/selectCommand");

module.exports = Object.freeze({
  content,
  start,
  scriptsDir: path.resolve(__dirname, "./scripts")
});

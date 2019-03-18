const path = require("path");
const { configure } = require("@numical/ubibot-config");
const content = require("./content");
const start = require("../commands/selectCommand");

module.exports = configure({
  content,
  start,
  scriptsDir: path.resolve(__dirname, "../../test/scripts")
});

const path = require("path");
const { configure } = require("../../../ubibot-config/api");
const content = require("./content");
const start = require("../commands/selectCommand");

module.exports = configure({
  content,
  start,
  scriptsDir: path.resolve(__dirname, "../../test/scripts")
});

const path = require("path");
const { configure } = require("@numical/ubibot-config");
const content = require("./content");
const context = require("./context");

module.exports = configure({
  content,
  contexts: [context],
  scriptsDir: path.resolve(__dirname, "../test/scripts")
});

const path = require("path");
const { configure } = require("@numical/ubibot-core");
const content = require("./content");
const context = require("./context");

module.exports = configure({
  content,
  contexts: [context],
  scriptsDir: path.resolve(__dirname, "../scripts")
});

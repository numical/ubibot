const path = require("path");
const { configure } = require("@numical/ubibot-config");
const content = require("./content");
const contexts = require("./contexts");

module.exports = configure({
  content,
  contexts,
  scriptsDir: path.resolve(__dirname, "../test/scripts")
});

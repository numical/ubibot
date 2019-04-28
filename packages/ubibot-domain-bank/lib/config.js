const path = require("path");
const { configure } = require("@numical/ubibot-core");
const content = require("./content");
const contexts = require("./contexts");

module.exports = configure({
  content,
  contexts,
  scriptsDir: path.resolve(__dirname, "../scripts")
});

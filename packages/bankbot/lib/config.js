const { configure } = require("@numical/ubibot-engine/");
const content = require("./content");
const contexts = require("./contexts");

module.exports = configure({
  content,
  contexts
});

const { configure } = require("@numical/ubibot-core/");
const content = require("./content");
const contexts = require("./contexts");

module.exports = configure({
  content,
  contexts
});

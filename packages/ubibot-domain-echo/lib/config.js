const { configure } = require("@numical/ubibot-core/");
const content = require("./content");
const context = require("./context");

module.exports = configure({
  content,
  contexts: [context]
});

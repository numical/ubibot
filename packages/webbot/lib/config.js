const { configure } = require("@numical/ubibot-core/");
const content = require("./content");
const WebBotContext = require("./WebBotContext");

module.exports = configure({
  content,
  contexts: [new WebBotContext()]
});

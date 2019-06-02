const { configure } = require("@numical/ubibot-engine/");
const content = require("./content");
const WebBotContext = require("./WebBotContext");

module.exports = configure({
  content,
  contexts: [new WebBotContext()]
});

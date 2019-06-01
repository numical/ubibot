const { configure } = require("@numical/ubibot-core/");
const content = require("./content");
const EchoContext = require("./EchoContext");

module.exports = configure({
  content,
  contexts: [new EchoContext()]
});

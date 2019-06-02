const { configure } = require("@numical/ubibot-engine/");
const content = require("./content");
const EchoContext = require("./EchoContext");

module.exports = configure({
  content,
  contexts: [new EchoContext()]
});

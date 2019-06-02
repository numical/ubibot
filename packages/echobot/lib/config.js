const { configure } = require("@numical/ubibot-engine/");
const content = require("./content");
const echoContext = require("./echoContext");
const exitContext = require("./exitContext");

module.exports = configure({
  content,
  contexts: [exitContext, echoContext]
});

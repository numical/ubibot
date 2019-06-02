const { Context, Match } = require("@numical/ubibot-engine/");
const connect = require("./commands/connect");
const fetch = require("./commands/fetch");

class WebBotContext extends Context {
  constructor() {
    super("WebBot");
  }

  match() {
    const { url } = this;
    const command = url ? fetch : connect;
    return Match.definite(command, this);
  }
}

module.exports = WebBotContext;

const { Context, Match } = require("@numical/ubibot-core/");
const parseURL = require("./parseURL");

class WebBotContext extends Context {
  constructor() {
    super("WebBot");
  }

  match() {
    return Match.definite(parseURL, this);
  }
}

module.exports = new WebBotContext();

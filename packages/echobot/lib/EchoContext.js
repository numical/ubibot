const { Context, Match } = require("@numical/ubibot-engine/");
const echoCommand = require("./command");

class EchoContext extends Context {
  constructor() {
    super("Echo");
  }
  match() {
    return Match.definite(echoCommand, this);
  }
}

module.exports = EchoContext;

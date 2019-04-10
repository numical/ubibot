const { Context, Match } = require("@numical/ubibot-core");
const echoCommand = require("./command");

class EchoContext extends Context {
  constructor() {
    super("Echo");
  }
  match(userCommand) {
    return Match.definite(echoCommand, this);
  }
}

module.exports = new EchoContext();

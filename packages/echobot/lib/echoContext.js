const { Context, Match } = require("@numical/ubibot-engine/");

const { STATELESS } = Context;

const echo = async request => request;

class EchoContext extends Context {
  constructor() {
    super("Echo", STATELESS);
  }
  match() {
    return Match.definite(echo, this);
  }
}

module.exports = new EchoContext();

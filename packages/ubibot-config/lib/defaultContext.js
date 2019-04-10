const { Context, Match } = require("@numical/ubibot-core");
const { notUnderstood } = require("./defaultContent");

const doNotUnderstand = async () => notUnderstood;

class DefaultContext extends Context {
  constructor() {
    super("Catch All");
  }

  /*
   This is not something you would want to do in your code.
   A Match.definite() would overrid any other context.
   */
  match(userCommand) {
    return Match.definite(doNotUnderstand, this);
  }
}

module.exports = new DefaultContext();

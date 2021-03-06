const Context = require("../engine/Context");
const Match = require("../engine/Match");
const { notUnderstood } = require("./defaultContent");

const doNotUnderstand = async () => notUnderstood;

class DefaultContext extends Context {
  constructor() {
    super("Catch All");
  }

  /*
   This is not something you would want to do in your code.
   A Match.definite() will override any other context.
   */
  match() {
    return Match.definite(doNotUnderstand, this);
  }
}

module.exports = DefaultContext;

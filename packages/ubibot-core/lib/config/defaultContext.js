const Context = require("../classes/Context");
const Match = require("../classes/Match");
const { notUnderstood } = require("./defaultContent");

const doNotUnderstand = async () => notUnderstood;

class DefaultContext extends Context {
  constructor() {
    super("Catch All");
  }

  /*
   This is not something you would want to do in your code.
   A Match.definite() would override any other context.
   */
  match() {
    return Match.definite(doNotUnderstand, this);
  }
}

module.exports = DefaultContext;

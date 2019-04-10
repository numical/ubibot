const { DEFINITE, NOT } = require("../constants/matchingThresholds.js");

const nullCommand = () => {
  throw new Error("Error - null command executed.");
};

class Match {
  static noMatch(context) {
    return new Match(NOT, nullCommand, context);
  }

  static definite(command, context) {
    return new Match(DEFINITE, command, context);
  }

  constructor(score, command, context) {
    this.command = command;
    this.context = context;
    this.score = score;
  }
}

module.exports = Match;

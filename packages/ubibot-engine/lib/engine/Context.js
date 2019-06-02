const { JaroWinklerDistance } = require("@numical/ubibot-natural");
const { noMatch } = require("./Match");

class Context {
  constructor(name, stateful = true) {
    this.name = name;
    this.stateful = stateful;
    this.commands = [];
    this.fns = [];
  }

  isStateful() {
    return this.stateful;
  }

  addCommand(userCommand, fn) {
    const { commands, fns } = this;
    if (Array.isArray(userCommand)) {
      userCommand.forEach(command => this.addCommand(command, fn));
    } else {
      commands.push(userCommand);
      fns.push(fn);
    }
  }

  match(userCommand) {
    const reducerFn = (bestMatch, command, index) => {
      const score = JaroWinklerDistance(command, userCommand);
      if (score > bestMatch.score) {
        bestMatch.score = score;
        bestMatch.command = this.fns[index];
      }
      return bestMatch;
    };
    return this.commands.reduce(reducerFn, noMatch(this));
  }
}

Context.STATELESS = false;

module.exports = Context;

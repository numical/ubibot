const { JaroWinklerDistance } = require("@numical/ubibot-natural");
const { noMatch } = require("./Match");

const createCommands = (all, { text, fn, score = Number.NEGATIVE_INFINITY }) => {
  if (Array.isArray(text)) {
    text.forEach(t => createCommands(all, { text: t, fn, score }));
  } else {
    all.push({ text, fn, score });
  }
  return all;
};

class Context {
  constructor({ name, commands = [], stateful = true }) {
    this.name = name;
    this.stateful = stateful;
    this.commands = commands.reduce(createCommands, []);
  }

  match(text) {
    const reducer = (bestMatch, command) => {
      const score = command.score < 0 ? JaroWinklerDistance(command.text, text) : command.score;
      if (score > bestMatch.score) {
        bestMatch.score = score;
        bestMatch.command = command.fn;
      }
      return bestMatch;
    };
    return this.commands.reduce(reducer, noMatch(this));
  }
}

module.exports = Context;

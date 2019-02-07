const content = require("../content/content");

const { botPrefix, prefixDelimiter, userPrefix } = content.io.console;

const parseScript = (script, userEnters, botReplies) => {
  if (script.length > 0) {
    const [line, ...remainingScript] = script;
    const [prefix, value] = line.split(prefixDelimiter);
    switch (prefix) {
      case userPrefix:
        userEnters(value);
        break;
      case botPrefix:
        botReplies(value);
        break;
      default:
        throw new Error(`Invalid script line: '${line}'`);
    }
    parseScript(remainingScript, userEnters, botReplies);
  }
};

module.exports = parseScript;

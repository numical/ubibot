const { EOL } = require("os");

const content = require("../../../content/content");

const output = console.log;

const clearConsole = () => output("\x1Bc");

const send = response => {
  response.split(EOL).forEach(line => {
    output(`${content.io.console.botPrefix}${line}`);
  });
};

module.exports = { clearConsole, send };

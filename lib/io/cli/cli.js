const { EOL } = require("os");
const readline = require("readline");
const { pipe } = require("ramda");
const respondTo = require("../../core/respondTo");
const content = require("../../content/content");

const { botPrefix, prefixDelimiter, userPrefix } = content.io.console;

const setUpUI = ({ stdin, stdout } = process) => {
  const ui = readline.createInterface(stdin, stdout);
  ui.setPrompt(`${userPrefix}${prefixDelimiter}`);
  ui.send = response => {
    response.split(EOL).forEach(line => {
      stdout.write(`${botPrefix}${prefixDelimiter}${line}\n`);
    });
  };
  return ui;
};

const sayHi = ui => {
  ui.send(content.io.console.hello);
  ui.prompt();
  return ui;
};

const startListening = ui => {
  ui.on("line", async request => {
    const response = await respondTo(request);
    ui.send(response);
    ui.prompt();
  });
};

const start = pipe(
  setUpUI,
  sayHi,
  startListening
);

module.exports = {
  start
};

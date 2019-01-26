const readline = require("readline");
const { pipe } = require("ramda");
const { clearConsole, send } = require("./out");
const respondTo = require("../../core/respondTo");
const content = require("../../../content/content");

const setUpUI = () => {
  const ui = readline.createInterface(process.stdin, process.stdout);
  ui.setPrompt(content.io.console.prompt);
  return ui;
};

const sayHi = ui => {
  clearConsole();
  send(content.io.console.hello);
  ui.prompt();
  return ui;
};

const startListening = ui => {
  ui.on("line", async request => {
    const response = await respondTo(request);
    send(response);
    ui.prompt();
  });
};

const start = pipe(
  setUpUI,
  sayHi,
  startListening
);

start();

const { Console } = require("console");
const { EOL } = require("os");
const readline = require("readline");
const { pipe } = require("ramda");
const respondTo = require("../../core/respondTo");
const content = require("../../content/content");

const setUpCommandLineInterface = ({ stdin, stdout } = process) => {
  const cli = readline.createInterface(stdin, stdout);
  cli.setPrompt(content.io.console.prompt);
  return { stdout, cli };
};

const setUpConsole = ({ stdout, cli }) => {
  const console = new Console(stdout);
  console.clear = () => console.log("\x1Bc");
  console.send = response => {
    response.split(EOL).forEach(line => {
      console.log(`${content.io.console.botPrefix}${line}`);
    });
  };
  return { console, cli };
};

const sayHi = ({ console, cli }) => {
  console.clear();
  console.send(content.io.console.hello);
  cli.prompt();
  return { console, cli };
};

const startListening = ({ console, cli }) => {
  cli.on("line", async request => {
    const response = await respondTo(request);
    console.send(response);
    cli.prompt();
  });
};

const start = pipe(
  setUpCommandLineInterface,
  setUpConsole,
  sayHi,
  startListening
);

module.exports = {
  start
};

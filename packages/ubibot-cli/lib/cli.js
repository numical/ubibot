const { EOL } = require("os");
const readline = require("readline");
const { respondTo } = require("@numical/ubibot-core");

const startCLI = (config, { stdin, stdout } = process) => {
  if (!config) {
    throw new Error("Missing config");
  }
  // get content
  const { content } = config;
  const { hello, io } = content;
  const { botPrefix, userPrefix } = io.console;

  // set up UI
  const ui = readline.createInterface(stdin, stdout);
  ui.setPrompt(userPrefix);
  const send = response => {
    response.split(EOL).forEach(line => {
      stdout.write(`${botPrefix}${line}\n`);
    });
  };

  // say Hi
  send(hello);
  ui.prompt();

  // start listening
  ui.on("line", async request => {
    const response = await respondTo(request, config.start);
    send(response);
    ui.prompt();
  });
};

module.exports = {
  startCLI
};

const { EOL } = require("os");
const readline = require("readline");
const { Chat } = require("@numical/ubibot-core/");

const startCLI = (config, { stdin, stdout } = process) => {
  if (!config) {
    throw new Error("Missing config");
  }

  // create new Chat instance;
  const chat = new Chat(config);

  // get content
  const { content } = config;
  const { io } = content;
  const { botPrefix, userPrefix } = io.console;

  // set up UI
  const ui = readline.createInterface(stdin, stdout);
  ui.setPrompt(userPrefix);
  const send = response => {
    response.split(EOL).forEach(line => {
      stdout.write(`${botPrefix}${line}${EOL}`);
    });
  };

  // say Hi
  send(chat.hello());
  ui.prompt();

  // start listening
  ui.on("line", async request => {
    const response = await chat.respondTo(request);
    send(response);
    ui.prompt();
  });
};

module.exports = {
  startCLI
};
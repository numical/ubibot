const { EOL } = require("os");
const readline = require("readline");
const { checkBot } = require("@numical/ubibot-util");
const { botPrefix, userPrefix } = require("./cliPrefixes");

const startCLI = (botFactory, { stdin, stdout } = process) => {
  // param checks
  const bot = botFactory();
  checkBot(bot);

  // set up UI
  const ui = readline.createInterface(stdin, stdout);
  ui.setPrompt(userPrefix);
  const send = response => {
    response.split(EOL).forEach(line => {
      stdout.write(`${botPrefix}${line}${EOL}`);
    });
  };

  // say Hi
  send(bot.hello());
  ui.prompt();

  // start listening
  ui.on("line", async request => {
    const response = await bot.respondTo(request);
    send(response);
    ui.prompt();
  });
};

module.exports = startCLI;

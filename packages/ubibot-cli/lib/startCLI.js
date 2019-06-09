const { EOL } = require("os");
const readline = require("readline");
const { checkBot, UserExit } = require("@numical/ubibot-util/");
const { botPrefix, userPrefix } = require("./cliPrefixes");

const defaultOptions = {
  enableExit: true
};

const startCLI = (botFactory, { stdin, stdout } = process, options) => {
  // param checks
  const bot = botFactory();
  checkBot(bot);
  const opts = { ...defaultOptions, ...options };

  // output function
  const send = response => {
    response.split(EOL).forEach(line => {
      stdout.write(`${botPrefix}${line}${EOL}`);
    });
  };

  // set up UI
  const ui = readline.createInterface(stdin, stdout);
  ui.setPrompt(userPrefix);

  // hello function
  const sayHi = async () => {
    send(await bot.hello());
    ui.prompt();
  };

  // start listening
  ui.on("line", async request => {
    try {
      const response = await bot.respondTo(request);
      send(response);
      ui.prompt();
    } catch (err) {
      const response = err instanceof UserExit ? err.message : `Unexpected Error: ${err.message}`;
      send(response);
      if (opts.enableExit) {
        const code = err instanceof UserExit ? 0 : 1;
        process.exit(code);
      }
    }
  });

  sayHi();
};

module.exports = startCLI;

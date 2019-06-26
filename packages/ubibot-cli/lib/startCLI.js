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
  const write = response => {
    const { value } = response;
    value.split(EOL).forEach(line => {
      stdout.write(`${botPrefix}${line}${EOL}`);
    });
  };

  // set up UI
  const ui = readline.createInterface(stdin, stdout);
  ui.setPrompt(userPrefix);

  // hello function
  const sayHi = async () => {
    write(await bot.hello());
    ui.prompt();
  };

  // start listening
  ui.on("line", async value => {
    try {
      const response = await bot.respondTo({ value });
      write(response);
      ui.prompt();
    } catch (err) {
      const value = err instanceof UserExit ? err.message : `Unexpected Error: ${err.message}`;
      write({ value });
      if (opts.enableExit) {
        const code = err instanceof UserExit ? 0 : 1;
        process.exit(code);
      }
    }
  });

  sayHi();
};

module.exports = startCLI;

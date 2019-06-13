#!/usr/bin/env node

const { resolve } = require("path");
const { execFile } = require("child_process");
const cwd = require("cwd");
const open = require("open");
const yargs = require("yargs");

/*
 'webpack-dev-server --open' does not seem to work in child process hence...
*/
const openBrowserOnce = () => {
  let url = false;
  let opened = false;
  return data => {
    if (!url && data.indexOf("http") > -1) {
      url = data.substring(data.indexOf("http"));
    }
    if (!opened && url && data.includes("Compiled")) {
      open(url, { wait: false });
      opened = true;
    }
  };
};

const { argv } = yargs.usage("$0 <bot>", "start a web bot in dev mode", yargs => {
  yargs.positional("bot", {
    describe: "the bot module - it must export an instance of Chat; e.g.: export const bot = new Chat(...);",
    type: "string"
  });
});

const webpackDevServer = resolve(__dirname, "../node_modules/.bin/", "webpack-dev-server");

const childProcessOptions = {
  cwd: resolve(__dirname, ".."),
  env: {
    NODE_ENV: "development",
    UBIBOT_SOURCE: resolve(cwd(), argv.bot)
  }
};

const childProcess = execFile(webpackDevServer, childProcessOptions);

childProcess.stdout.on("data", console.log);
childProcess.stdout.on("data", openBrowserOnce());
childProcess.stderr.on("data", console.error || console.log);

#!/usr/bin/env node

const { resolve } = require("path");
const { execFile } = require("child_process");
const cwd = require("cwd");
const yargs = require("yargs");

const args = yargs.usage("$0 <bot>", "start a web bot in dev mode", yargs => {
  yargs.positional("bot", {
    describe: "the bot module - it must export an instance of Chat; e.g.: export const bot = new Chat(...);",
    type: "string"
  });
}).argv;

const childProcessOptions = {
  cwd: resolve(__dirname, ".."),
  env: {
    NODE_ENV: "development",
    UBIBOT_SOURCE: resolve(cwd(), args.bot)
  }
};
const webpackDevServer = resolve(__dirname, "../node_modules/.bin/", "webpack-dev-server");

const childProcess = execFile(webpackDevServer, childProcessOptions);

childProcess.stdout.on("data", console.log);
childProcess.stderr.on("data", console.error || console.log);

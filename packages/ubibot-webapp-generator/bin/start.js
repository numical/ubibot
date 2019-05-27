#!/usr/bin/env node

const { resolve } = require("path");
const { execFile } = require("child_process");
const cwd = require("cwd");

const argv = require("yargs").usage("$0 <bot>", "start a web bot in dev mode", yargs => {
  yargs.positional("bot", {
    describe: "the bot module - it must export an instance of Chat; e.g.: export const bot = new Chat(...);",
    type: "string"
  });
}).argv;

const botFile = resolve(cwd(), argv.bot);

const options = {
  cwd: resolve(__dirname, ".."),
  env: {
    NODE_ENV: "development",
    UBIBOT_SOURCE: botFile
  }
};
const file = resolve(__dirname, "../node_modules/.bin/", "webpack-dev-server");

const child = execFile(file, options);

child.stdout.on("data", console.log);
child.stderr.on("data", console.error || console.log);

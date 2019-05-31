#!/usr/bin/env node

const { resolve } = require("path");
const { execFile } = require("child_process");
const cwd = require("cwd");
const yargs = require("yargs");

const args = yargs.command("$0 <bot> <output>", "build a web bot", yargs => {
  yargs
    .positional("bot", {
      describe: "the bot module - it must export an instance of Chat; e.g.: export const bot = new Chat(...);",
      type: "string"
    })
    .positional("output", {
      descibe: "the output directory for the build",
      type: "string"
    });
}).argv;

const childProcessOptions = {
  cwd: resolve(__dirname, ".."),
  env: {
    NODE_ENV: "production",
    UBIBOT_SOURCE: resolve(cwd(), args.bot),
    UBIBOT_DESTINATION: resolve(cwd(), args.output)
  }
};
const webpack = resolve(__dirname, "../node_modules/.bin/", "webpack");

const childProcess = execFile(webpack, childProcessOptions);

childProcess.stdout.on("data", console.log);
childProcess.stderr.on("data", console.error || console.log);

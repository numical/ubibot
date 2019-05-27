#!/usr/bin/env node

const { resolve } = require("path");
const { execFile } = require("child_process");
const cwd = require("cwd");

const argv = require("yargs").command("$0 <bot> <output>", "build a web bot", yargs => {
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

const src = resolve(cwd(), argv.bot);
const dest = resolve(cwd(), argv.output);

const options = {
  cwd: resolve(__dirname, ".."),
  env: {
    NODE_ENV: "production",
    UBIBOT_SOURCE: src,
    UBIBOT_DESTINATION: dest
  }
};
const file = resolve(__dirname, "../node_modules/.bin/", "webpack");

const child = execFile(file, options);

child.stdout.on("data", console.log);
child.stderr.on("data", console.error || console.log);

#!/usr/bin/env node

const { resolve } = require("path");
const { statSync } = require("fs");
const cwd = require("cwd");
const yargs = require("yargs");
const startReST = require("../lib/startReST");

const args = yargs.usage("$0 <bot>", "start a bot exposed by a ReST interface", yargs => {
  yargs.positional("botFactory", {
    describe: "the bot factory module - exports a function that will create an instance of Ubibot when executed",
    type: "string"
  });
}).argv;

const botFactoryPath = resolve(cwd(), args.bot);
if (!statSync(botFactoryPath).isFile()) {
  throw new Error(`Invalid bot factory file '${botFactoryPath}'`);
}

// eslint-disable-next-line import/no-dynamic-require
const botFactory = require(botFactoryPath);

startReST(botFactory);

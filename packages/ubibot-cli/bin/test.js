#!/usr/bin/env node

const { basename, resolve } = require("path");
const { statSync } = require("fs");
const cwd = require("cwd");
const yargs = require("yargs");
const testCLI = require("../lib/testCLI");

const args = yargs.usage("$0 <bot> <scriptsDir>", "run scripted tests through the command line interface", yargs => {
  yargs
    .positional("botFactory", {
      describe: "the bot factory module - exports a function that will create an instance of Ubibot  when executed",
      type: "string"
    })
    .positional("scriptsDir", {
      describe: "the scripts directory for the build",
      type: "string"
    });
}).argv;

const botFactoryPath = resolve(cwd(), args.bot);
if (!statSync(botFactoryPath).isFile()) {
  throw new Error(`Invalid bot file '${botFactoryPath}'`);
}

const scriptsDir = resolve(cwd(), args.scriptsDir);
if (!statSync(scriptsDir).isDirectory()) {
  throw new Error(`Invalid scripts directory '${scriptsDir}'`);
}

const name = basename(botFactoryPath);
// eslint-disable-next-line import/no-dynamic-require
const botFactory = require(botFactoryPath);

testCLI(name, botFactory, scriptsDir);

const { Context, scores } = require("@numical/ubibot-engine/");
const bye = require("./commands/bye");
const echo = require("./commands/echo");

const { DEFINITE } = scores;

const exitCommands = [{ text: ["bye", "goodbye", "exit", "quit"], fn: bye }];
const exitContext = new Context({ name: "Help", commands: exitCommands });

const echoCommands = [{ text: "help", fn: echo, score: DEFINITE }];
const echoContext = new Context({ name: "Help", commands: echoCommands, stateful: false });

module.exports = [exitContext, echoContext];

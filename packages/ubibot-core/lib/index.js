// the public api
const Chat = require("./classes/Chat");
const Context = require("./classes/Context");
const Match = require("./classes/Match");
const prefixes = require("./constants/prefixes");
const configure = require("./config/configure");
const checkBot = require("./util/checkBot");
const createContentTemplate = require("./util/createContentTemplate");

module.exports = { Chat, Context, Match, prefixes, configure, checkBot, createContentTemplate };

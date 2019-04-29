// the public api
const Chat = require("./lib/classes/Chat");
const Context = require("./lib/classes/Context");
const Match = require("./lib/classes/Match");
const prefixes = require("./lib/constants/prefixes");
const configure = require("./lib/config/configure");

module.exports = { Chat, Context, Match, prefixes, configure };

// the public api
const checkBot = require("./lib/checkBot");
const createContentTemplate = require("./lib/createContentTemplate");
const prefixes = require("./lib/prefixes");
const UserExit = require("./lib/UserExit");

module.exports = { checkBot, createContentTemplate, prefixes, UserExit };

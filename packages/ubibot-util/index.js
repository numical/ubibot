// the public api
const checkBot = require("./lib/checkBot");
const createContentTemplate = require("./lib/createContentTemplate");
const EOL = require("./lib/EOL");
const UserExit = require("./lib/UserExit");

module.exports = { checkBot, createContentTemplate, EOL, UserExit };

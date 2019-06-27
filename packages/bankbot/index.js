const { Chat } = require("@numical/ubibot-engine/");
const config = require("./lib/config");

module.exports = state => new Chat(config, state);

const { Chat } = require("@numical/ubibot-engine");
const config = require("./lib/config");

module.exports = () => new Chat(config);

const { Chat } = require("@numical/ubibot-core");
const config = require("./lib/config");

module.exports = () => new Chat(config);

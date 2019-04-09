const hello = require("./hello");
const help = require("./help");

module.exports = async request => (request === "help" ? help : hello);

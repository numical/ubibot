const { Context } = require("@numical/ubibot-core");
const help = require("./commands/help");

const helpContext = new Context("Help");
helpContext.addCommand(["help"], help );

module.exports = [
  helpContext
];

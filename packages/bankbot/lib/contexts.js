const { Context } = require("@numical/ubibot-core");
const help = require("./commands/help");
const balance = require("./commands/balance");

const helpContext = new Context("Help");
helpContext.addCommand("help", help);

const balanceContext = new Context("Balance");
balanceContext.addCommand("balance", balance);

module.exports = [
  balanceContext,
  helpContext
];

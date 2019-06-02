const { Context } = require("@numical/ubibot-engine/");
const help = require("./commands/help");
const balance = require("./commands/balance");
const accountDetails = require("./commands/accountDetails");

const helpContext = new Context("Help");
helpContext.addCommand("help", help);

const balanceContext = new Context("Balance");
balanceContext.addCommand("balance", balance);

const accountDetailsContext = new Context("Account Details");
accountDetailsContext.addCommand(["sortcode", "sort code", "account number", "details"], accountDetails);

module.exports = [balanceContext, accountDetailsContext, helpContext];

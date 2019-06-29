const { Context } = require("@numical/ubibot-engine/");
const help = require("./commands/help");
const balance = require("./commands/balance");
const accountDetails = require("./commands/accountDetails");
const listPayees = require("./commands/listPayees");
const transactions = require("./commands/transactions");

const helpCommands = [{ text: "help", fn: help }];
const helpContext = new Context({ name: "Help", commands: helpCommands });

const balanceCommands = [{ text: "balance", fn: balance }];
const balanceContext = new Context({ name: "Balance", commands: balanceCommands });

const accountDetailsCommands = [{ text: ["sortcode", "sort code", "account number", "details"], fn: accountDetails }];
const accountDetailsContext = new Context({ name: "Account Details", commands: accountDetailsCommands });

const payeeCommands = [{ text: "payees", fn: listPayees }];
const payeeContext = new Context({ name: "Transactions", commands: payeeCommands });

const transactionCommands = [{ text: ["transactions", "txns"], fn: transactions }];
const transactionContext = new Context({ name: "Transactions", commands: transactionCommands });

module.exports = [balanceContext, transactionContext, payeeContext, accountDetailsContext, helpContext];

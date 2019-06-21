const payees = require("./payees");
const transactions = require("./transactions");

module.exports = {
  balance: transactions[0].netBalance,
  sortcode: "01-02-03",
  accountNumber: "0123456789",
  payees,
  transactions
};

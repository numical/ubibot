/* eslint no-template-curly-in-string: 0 */
const { createContentTemplate } = require("@numical/ubibot-util/");

module.exports = Object.freeze({
  hello: "Hello. I'm BankBot.  How can I help?",
  help: "Things I can do - check your [balance]",
  balanceTemplate: createContentTemplate("Your current balance is £${balance}"),
  accountDetailsTemplate: createContentTemplate(
    "The sort code is ${sortcode} and the account number is ${accountNumber}."
  ),
  payees: {
    title: "Available payees are:",
    lineTemplate: createContentTemplate("${index}: ${name} : ${sortcode} : ${accountNumber}")
  },
  transactions: {
    title: "Your most recent transactions are:",
    lineTemplate: createContentTemplate("${date} : ${type} : ${merchant} : ${signedAmount}", {
      signedAmount: ({ amount, category }) => (category === "Credit" ? `£${amount}` : `-£${amount}`)
    })
  }
});

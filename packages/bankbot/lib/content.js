/* eslint no-template-curly-in-string: 0 */
const { createTemplate } = require("@numical/ubibot-config");

module.exports = Object.freeze({
  hello: "Hello. I'm BankBot.  How can I help?",
  help: "Things I can do - check your [balance]",
  balanceTemplate: createTemplate("Your current balance is £${balance}.")
});

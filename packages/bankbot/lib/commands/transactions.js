const { EOL } = require("@numical/ubibot-util");
const { transactions } = require("../content");
const getAccount = require("../mocks/getAccount");

const MAX_LINES = 6;
const { title, lineTemplate } = transactions;

module.exports = async () => {
  const account = await getAccount();
  const lines = [title, ...account.transactions.map(lineTemplate)];
  return lines.slice(0, MAX_LINES + 1).join(EOL);
};

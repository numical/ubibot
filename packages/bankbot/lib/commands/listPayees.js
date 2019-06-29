const { EOL } = require("@numical/ubibot-util");
const { payees } = require("../content");
const getAccount = require("../../mocks/getAccount");

const { title, lineTemplate } = payees;

module.exports = async () => {
  const account = await getAccount();
  const lines = [title, ...account.payees.map((p, i) => lineTemplate({ index: i + 1, ...p }))];
  return lines.join(EOL);
};

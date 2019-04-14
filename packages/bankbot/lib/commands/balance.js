const { balanceTemplate } = require("../content");
const getAccount = require("../mocks/getAccount");

module.exports = async request => balanceTemplate(await getAccount());

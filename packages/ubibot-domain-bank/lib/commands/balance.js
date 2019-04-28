const { balanceTemplate } = require("../content");
const getAccount = require("../mocks/getAccount");

module.exports = async () => balanceTemplate(await getAccount());

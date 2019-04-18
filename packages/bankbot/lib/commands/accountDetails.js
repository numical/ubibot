const { accountDetailsTemplate } = require("../content");
const getAccount = require("../mocks/getAccount");

module.exports = async request => accountDetailsTemplate(await getAccount());

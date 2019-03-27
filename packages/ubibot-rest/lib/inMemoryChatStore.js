const store = new Map();

const get = async chatId => store.get(chatId);

const set = async (chatId, chat) => store.set(chatId, chat);

const remove = async chatId => store.delete(chatId);

module.exports = { get, set, remove };

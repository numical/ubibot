const store = new Map();

const get = async conversationId => store.get(conversationId);

const set = async (conversationId, conversation) => store.set(conversationId, conversation);

const remove = async conversationId => store.delete(conversationId);

module.exports = { get, set, remove };

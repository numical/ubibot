const store = new Map();

const get = async botId => store.get(botId);

const set = async (botId, botState) => store.set(botId, botState);

const remove = async botId => store.delete(botId);

module.exports = { get, set, remove };

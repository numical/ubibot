const options = require("./fetchOptions");

module.exports = async (request, context) => {
  try {
    const { chatId, url } = context;
    const endpoint = `${url}/${chatId}`;
    const body = JSON.stringify({ user: request });
    const response = await fetch(endpoint, { ...options, body });
    if (response.ok) {
      const { bot, chatId } = await response.json();
      context.chatId = chatId;
      return bot;
    } else {
      context.url = undefined;
      const { status, statusText } = response;
      return `Ubibot can no longer to this URL (error status: ${status}, error message: ${statusText}).  Please enter another URL to try:`;
    }
  } catch (err) {
    context.url = undefined;
    return `Ubibot could not talk to this URL (error messsage: ${err.message}).  Please enter anther URL to try:`;
  }
};

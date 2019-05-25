const options = require("./fetchOptions");

module.exports = async (request, context) => {
  try {
    const url = request.startsWith("http") ? `${request}/chat` : `http://${request}/chat`;
    const response = await fetch(url, options);
    if (response.ok) {
      const { bot, chatId } = await response.json();
      context.url = url;
      context.chatId = chatId;
      return bot;
    } else {
      context.url = undefined;
      const { status, statusText } = response;
      return `Ubibot could not talk to this URL (error status: ${status}, error message: ${statusText}).  Please try another`;
    }
  } catch (err) {
    context.url = undefined;
    return `Ubibot could not talk to this URL (error messsage: ${err.message}).  Please try another`;
  }
};

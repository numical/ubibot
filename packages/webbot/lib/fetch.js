const options = require("./fetchOptions");

module.exports = async ({ request, context }) => {
  try {
    const { botId, url } = context;
    const endpoint = `${url}/bot/${botId}`;
    const body = JSON.stringify({ userRequest: request });
    const response = await fetch(endpoint, { ...options, body });
    if (response.ok) {
      const { botId, botResponse } = await response.json();
      context.botId = botId;
      return botResponse;
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

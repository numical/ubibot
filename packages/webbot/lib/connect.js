const options = require("./fetchOptions");

module.exports = async ({ request, context }) => {
  try {
    const url = request.startsWith("http") ? request : `http://${request}`;
    const response = await fetch(`${url}/bots`, options);
    if (response.ok) {
      const { botId, botResponse } = await response.json();
      context.url = url;
      context.botId = botId;
      return botResponse.value;
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

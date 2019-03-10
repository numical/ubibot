const conversation = conversationId => `/conversation/${conversationId}`;
const healthCheck = "/health";
const newConversation = "/conversation";

module.exports = {
  conversation,
  healthCheck,
  newConversation
};

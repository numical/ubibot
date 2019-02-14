const { EOL } = require("os");
const Koa = require("koa");
const Body = require("koa-body");
const Router = require("koa-router");
const { notImplemented, methodNotAllowed } = require("boom");
const endPoints = require("./endPoints");
const respondTo = require("../../core/respondTo");
const content = require("../../content/content");

const hello = content.io.hello;

const defaultOptions = {
  port: 1971,
  store: require("./inMemoryConversationStore"),
  idGenerator: require("./conversationIdGenerator")
};

const start = options => {
  const { port, store, idGenerator } = { ...defaultOptions, ...options };

  const healthCheck = async ({ response }) => {
    response.status = 200;
  };

  const newConversation = async ({ request, response }) => {
    const conversationId = await idGenerator();
    const conversation = { bot: hello, conversationId, history: hello };
    await store.set(conversationId, conversation);
    response.body = { bot: hello, conversationId };
  };

  const continueConversation = async ({ request, response, params }) => {
    const { user } = request.body;
    const { conversationId } = params;
    const conversation = await store.get(conversationId);
    if (conversation) {
      const bot = await respondTo(user);
      const updatedConversation = {
        ...conversation,
        bot,
        history: [...conversation.history, user, ...conversation.bot],
        user
      };
      await store.set(conversationId, updatedConversation);
      response.body = { bot, conversationId };
    } else {
      response.status = 404;
    }
  };

  const app = new Koa();
  app.use(new Body());
  const router = new Router();
  app.use(
    router.allowedMethods({
      throw: true,
      notImplemented,
      methodNotAllowed
    })
  );
  app.use(router.routes());

  router.get(endPoints.healthCheck, healthCheck);
  router.post(endPoints.newConversation, newConversation);
  router.post(endPoints.conversation(":conversationId"), continueConversation);

  return app.listen(port, () => {
    console.log(`ubibot http server listening on port ${port} and pid ${process.pid}`);
  });
};

module.exports = {
  start
};

const { EOL } = require("os");
const Koa = require("koa");
const Body = require("koa-body");
const Router = require("koa-router");
const { notImplemented, methodNotAllowed } = require("boom");
const endPoints = require("./endPoints");
const respondTo = require("../../core/respondTo");
const content = require("../../content/content");

const hello = content.io.hello.split(EOL);

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
    const { userSays } = request.body;
    const [reply, conversationId] = await Promise.all([respondTo(userSays), idGenerator()]);
    const botSays = [...hello, ...reply.split(EOL)];
    const conversation = { botSays, conversationId, history: [userSays, botSays] };
    await store.set(conversationId, conversation);
    response.body = { botSays, conversationId };
  };

  const continueConversation = async ({ request, response, params }) => {
    const { userSays } = request.body;
    const { conversationId } = params;
    const conversation = await store.get(conversationId);
    if (conversation) {
      const reply = await respondTo(userSays);
      const botSays = reply.split(EOL);
      const updatedConversation = {
        ...conversation,
        botSays,
        history: [...conversation.history, userSays, ...conversation.botSays],
        userSays
      };
      await store.set(conversationId, updatedConversation);
      response.body = { botSays, conversationId };
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

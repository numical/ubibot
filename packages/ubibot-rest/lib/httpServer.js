const Koa = require("koa");
const Body = require("koa-body");
const Router = require("koa-router");
const { notImplemented, methodNotAllowed } = require("boom");
const endPoints = require("./endPoints");
const { respondTo } = require("@numical/ubibot-core");

const defaultOptions = {
  port: 1971,
  store: require("./inMemoryChatStore"),
  idGenerator: require("./chatIdGenerator")
};

const startReST = (config, options) => {
  const { port, store, idGenerator } = { ...defaultOptions, ...options };
  const { content } = config;
  const { hello } = content;

  const healthCheck = async ({ response }) => {
    response.status = 200;
  };

  const newChat = async ({ request, response }) => {
    const chatId = await idGenerator();
    const chat = { bot: hello, chatId, history: hello };
    await store.set(chatId, chat);
    response.body = { bot: hello, chatId };
  };

  const continueChat = async ({ request, response, params }) => {
    const { user } = request.body;
    const { chatId } = params;
    const chat = await store.get(chatId);
    if (chat) {
      const bot = await respondTo(user, config.start);
      const updatedchat = {
        ...chat,
        bot,
        history: [...chat.history, user, ...chat.bot],
        user
      };
      await store.set(chatId, updatedchat);
      response.body = { bot, chatId };
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
  router.post(endPoints.newChat, newChat);
  router.post(endPoints.chat(":chatId"), continueChat);

  return app.listen(port, () => {
    console.log(`ubibot http server listening on port ${port} and pid ${process.pid}`);
  });
};

module.exports = {
  startReST
};

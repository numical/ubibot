const Koa = require("koa");
const Body = require("koa-body");
const Router = require("koa-router");
const { notImplemented, methodNotAllowed } = require("boom");
const endPoints = require("./endPoints");
const { Chat } = require("@numical/ubibot-core");

const defaultOptions = {
  port: 1971,
  store: require("./inMemoryChatStore"),
  idGenerator: require("./chatIdGenerator")
};

const startReST = (config, options) => {
  const { port, store, idGenerator } = { ...defaultOptions, ...options };

  const healthCheck = async ({ response }) => {
    response.status = 200;
  };

  const newChat = async ({ request, response }) => {
    const chatId = await idGenerator();
    const chat = new Chat(config);
    await store.set(chatId, chat.getState());
    response.body = { bot: chat.hello(), chatId };
  };

  const continueChat = async ({ request, response, params }) => {
    const { user } = request.body;
    const { chatId } = params;
    const state = await store.get(chatId);
    if (state) {
      const chat = new Chat(config, state);
      const bot = await chat.respondTo(user);
      await store.set(chatId, chat.getState());
      response.body = { bot, chatId };
    } else {
      response.status = 404;
    }
  };

  const createApp = () => {
    const app = new Koa();
    const router = new Router();

    app.use(new Body());
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
    return app;
  };

  return createApp().listen(port, () => {
    console.log(`ubibot http server listening on port ${port} and pid ${process.pid}`);
  });
};

module.exports = {
  startReST
};

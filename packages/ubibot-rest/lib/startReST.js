const Koa = require("koa");
const Body = require("koa-body");
const { checkBot, UserExit } = require("@numical/ubibot-util/");
const endPoints = require("./endPoints");
const addHeaders = require("./addHeaders");
const addRouter = require("./addRouter");

const defaultOptions = {
  port: 1971,
  store: require("./inMemoryStore"),
  idGenerator: require("./IdGenerator")
};

const startReST = (botFactory, options) => {
  const { port, store, idGenerator } = { ...defaultOptions, ...options };

  const healthCheck = async ({ response }) => {
    response.status = 200;
  };

  const newBot = async ({ response }) => {
    const botId = await idGenerator();
    const bot = botFactory();
    checkBot(bot);
    await store.set(botId, bot.getState());
    response.body = { botId, botResponse: bot.hello() };
  };

  const existingBot = async ({ request, response, params }) => {
    const { userRequest } = request.body;
    const { botId } = params;
    const botState = await store.get(botId);
    if (botState) {
      try {
        const bot = botFactory(botState);
        const botResponse = await bot.respondTo(userRequest);
        await store.set(botId, bot.getState());
        response.body = { botId, botResponse };
      } catch (err) {
        const botResponse = err instanceof UserExit ? err.message : `Unexpected Error: ${err.message}`;
        await store.remove(botId);
        response.body = { botId, botResponse };
      }
    } else {
      response.status = 404;
    }
  };

  const createApp = () => {
    const app = new Koa();
    app.use(new Body());
    addHeaders(app);
    const router = addRouter(app);
    router.get(endPoints.healthCheck, healthCheck);
    router.post(endPoints.bots, newBot);
    router.post(endPoints.bot(":botId"), existingBot);
    return app;
  };

  return createApp().listen(port, () => {
    console.log(`
Ubibot http server listening on port ${port} and pid ${process.pid}
Endpoints available :
- GET ${endPoints.healthCheck} : returns 200 if all OK
- POST ${endPoints.bots} : starts a converstation with a new bot
- POST ${endPoints.bot("xxx")} : continues a conversation with an existing bot`);
  });
};

module.exports = startReST;

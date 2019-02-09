const Koa = require("koa");
const Body = require("koa-body");
const Router = require("koa-router");
const respondTo = require("../../core/respondTo");

const healthCheck = async ctx => {
  ctx.status = 200;
};

const incomingMessage = async ({ request, response }) => {
  const { user } = request.body;
  const bot = await respondTo(user);
  response.body = { bot };
};

const server = new Koa();
server.use(new Body());
const router = new Router();
server.use(router.allowedMethods());
server.use(router.routes());

router.get("/health", healthCheck);
router.post("/conversation", incomingMessage);

const start = (port = 1971) => {
  return server.listen(port, () => {
    console.log(`ubibot http server listening on port ${port} and pid ${process.pid}`);
  });
};

module.exports = {
  start
};

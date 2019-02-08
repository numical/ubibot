const Koa = require("koa");
const Router = require("koa-router");
const respondTo = require("../../core/respondTo");

const healthCheck = async ctx => {
  ctx.status = 200;
};

const incomingMessage = async ctx => {
  const msg = ctx.body;
  const reply = await respondTo(msg)
  ctx.body = reply;
};

const server = new Koa();
const router = new Router();
server.use(router.allowedMethods());
server.use(router.routes());

router.get("/health", healthCheck);
router.post("/message", incomingMessage);

const start = (port = 1971) => {
  return server.listen(port, () => {
    console.log(`ubibot http server listening on port ${port} and pid ${process.pid}`);
  });
};

module.exports = {
  start
};

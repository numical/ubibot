const Router = require("koa-router");

const addRouter = app => {
  const router = new Router();
  app.use(router.routes());
  app.use(router.allowedMethods());
  return router;
};

module.exports = addRouter;

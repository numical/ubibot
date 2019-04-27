const Router = require("koa-router");
const { notImplemented, methodNotAllowed } = require("boom");

const addRouter = app => {
  const router = new Router();
  app.use(
    router.allowedMethods({
      throw: true,
      notImplemented,
      methodNotAllowed
    })
  );
  app.use(router.routes());
  return router;
};

module.exports = addRouter;

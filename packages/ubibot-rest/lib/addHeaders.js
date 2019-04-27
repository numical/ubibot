const addHeaders = app => {
  app.use(async (ctx, next) => {
    ctx.set("Access-Control-Allow-Origin", "*");
    ctx.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    ctx.set("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    await next();
  });
};

module.exports = addHeaders;

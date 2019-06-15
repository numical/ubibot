const cors = require("koa-cors");

const options = {
  methods: "POST"
};

const addCors = app => {
  app.use(cors(options));
};

module.exports = addCors;

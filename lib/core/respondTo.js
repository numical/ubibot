const config = require("../config/configure")();

const respondTo = async (request, respond = config.start) => {
  const response = await respond(request);
  return typeof response === "function" ? respondTo(request, response) : response;
};

module.exports = respondTo;

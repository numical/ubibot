const selectCommand = require("./selectCommand");

const respondTo = async (request, respond = selectCommand) => {
  const response = await respond(request);
  return typeof response === "function"
    ? respondTo(request, response)
    : response;
};

module.exports = respondTo;

const respondTo = async (request, respond) => {
  const response = await respond(request);
  return typeof response === "function" ? respondTo(request, response) : response;
};

module.exports = respondTo;

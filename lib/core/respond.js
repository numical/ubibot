const respondTo = (request, respondTo) => {
  const response = respondTo(request);
  return typeof response === "function" ? response(request) : response;
};

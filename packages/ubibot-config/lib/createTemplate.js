const createTemplate = templateExpression => tokens =>
  tokens
    ? Object.entries(tokens).reduce(
        (string, [key, value]) => string.replace("${" + key + "}", value),
        templateExpression
      )
    : templateExpression;

module.exports = createTemplate;

const createContentTemplate = templateExpression => tokens =>
  tokens
    ? Object.entries(tokens).reduce(
        (string, [key, value]) => string.replace("${" + key + "}", value),
        templateExpression
      )
    : templateExpression;

module.exports = createContentTemplate;

const replaceToken = (string, [key, value]) => string.replace("${" + key + "}", value);

const replaceTokenFunction = (tokens, string, [key, fn]) => {
  return string.replace("${" + key + "}", fn(tokens));
};

const createContentTemplate = (templateExpression, tokenFunctions = {}) => (tokens = {}) =>
  Object.entries(tokenFunctions).reduce(
    replaceTokenFunction.bind(null, tokens),
    Object.entries(tokens).reduce(replaceToken, templateExpression)
  );

module.exports = createContentTemplate;

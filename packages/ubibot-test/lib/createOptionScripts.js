const { delimiter, userPrefix } = require("./constants");

const optionsLinePrefix = `${userPrefix}${delimiter}[`;
const optionsLineSuffix = "]";
const optionsLineDelimiter = "|";

const isOptionsLine = line => line.startsWith(optionsLinePrefix) && line.endsWith(optionsLineSuffix);

const createOptionsScripts = (scripts, [name, content]) => {
  const firstOptionIndex = content.findIndex(isOptionsLine);
  if (firstOptionIndex < 0) {
    scripts[name] = content;
  } else {
    const options = content[firstOptionIndex]
      .slice(optionsLinePrefix.length, -1 * optionsLineSuffix.length)
      .split(optionsLineDelimiter);
    options.forEach((option, index) => {
      const optionContent = [...content];
      // eslint-disable-next-line const-immutable/no-mutation
      optionContent[firstOptionIndex] = `${userPrefix}${delimiter}${option}`;
      const optionName = `${name}.${index}`;
      scripts = createOptionsScripts(scripts, [optionName, optionContent]);
    });
  }
  return scripts;
};

module.exports = createOptionsScripts;

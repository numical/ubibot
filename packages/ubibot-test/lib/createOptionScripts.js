const isOptionsLine = line => line.startsWith("[") && line.endsWith("]");

const createOptionsScripts = (scripts, [name, content]) => {
  const firstOptionIndex = content.findIndex(isOptionsLine);
  if (firstOptionIndex < 0) {
    scripts[name] = content;
  } else {
    const options = content[firstOptionIndex].slice(1, -1).split("|");
    options.forEach((option, index) => {
      const optionContent = [...content];
      // eslint-disable-next-line const-immutable/no-mutation
      optionContent[firstOptionIndex] = option;
      const optionName = `${name}.${index}`;
      scripts = createOptionsScripts(scripts, [optionName, optionContent]);
    });
  }
  return scripts;
};

module.exports = createOptionsScripts;

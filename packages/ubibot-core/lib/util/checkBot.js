const methods = ["hello", "respondTo", "getState"];

const checkMethod = (bot, name) => {
  if (!bot[name]) {
    throw new Error(`Bot missing '${name}' method.`);
  } else if (typeof bot[name] !== "function") {
    throw new Error(`Bot missing '${name}' method.`);
  }
};

const checkBot = bot => {
  if (!bot) {
    throw new Error("Bot missing");
  } else {
    const check = checkMethod.bind(null, bot);
    methods.forEach(check);
  }
};

module.exports = checkBot;

const { EOL } = require("os");

module.exports = Object.freeze({
  hello: `Hi, I'm Ubibot.${EOL}I'm not very clever, but I am very focussed on helping you.`,
  io: {
    console: {
      botPrefix: "Ubibot : ",
      userPrefix: "You : "
    }
  }
});

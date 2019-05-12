const { EOL } = require("os");

module.exports = Object.freeze({
  hello: `Hi, I'm Ubibot.${EOL}I'm not very clever, but I am very focussed on helping you.`,
  eroror: "Sorry, I hit an error I cannot deal with.  Plaease try again.",
  notUnderstood: "Sorry, this humble bot does not understand you.",
  io: {
    console: {
      botPrefix: "Ubibot : ",
      userPrefix: "You : "
    }
  }
});

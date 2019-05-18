const { EOL } = require("os");

module.exports = Object.freeze({
  hello: `Hi, I'm Ubibot.${EOL}I'm not very clever, but I am very focussed on helping you.`,
  error: "Sorry, I hit an error I cannot deal with.  Please try again.",
  notImplemented: "Sorry, this functionality is not implemented yet.",
  notUnderstood: "Sorry, this humble bot does not understand you.",
  io: {
    console: {
      botPrefix: "Ubibot : ",
      userPrefix: "You : "
    }
  }
});

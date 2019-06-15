const connect = require("./connect");
const fetch = require("./fetch");

class Webbot {
  constructor() {
    this.context = {};
  }

  async hello() {
    return "Please enter the URL of the Ubibot implementation you want to chat with:";
  }

  async respondTo(request) {
    const { context } = this;
    const fn = context.url ? fetch : connect;
    return fn({ request, context });
  }
}

module.exports = Webbot;

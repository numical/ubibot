const clone = require("ramda/src/clone");
const selectMatch = require("./selectMatch");

function bindMethod(method) {
  this[method] = this[method].bind(this);
}

async function callCommand(context, command, request) {
  const response = await command(request, context);
  return typeof response === "function" ? callCommand(context, response, request) : response;
}

const methods = ["getState", "hello", "respondTo"];

class Chat {
  constructor(config, state = {}) {
    if (!config) throw new Error("Missing config for new Chat");
    this.config = config;
    this.contexts = [];
    this.state = state;
    methods.forEach(bindMethod.bind(this));
  }

  async getState() {
    return clone(this.state);
  }

  async hello() {
    const { config } = this;
    const { hello } = config.content;
    return hello;
  }

  async respondTo(request) {
    const { config, contexts } = this;
    const { command, context } = await selectMatch(config, contexts, request);
    const response = await callCommand(context, command, request);
    return response;
  }
}

module.exports = Chat;

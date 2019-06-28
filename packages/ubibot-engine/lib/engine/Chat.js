const clone = require("ramda/src/clone");
const selectMatch = require("./selectMatch");

async function call(context, command, text) {
  const response = await command(text, context);
  return typeof response === "function" ? call(context, response, text) : response;
}

const methods = ["getState", "hello", "respondTo"];

class Chat {
  constructor(config, state = {}) {
    if (!config) throw new Error("Missing config for new Chat");
    this.config = config;
    this.contexts = [];
    this.state = state;
    methods.forEach(method => {
      this[method] = this[method].bind(this);
    });
  }

  async getState() {
    return clone(this.state);
  }

  async hello() {
    const { config } = this;
    const { hello } = config.content;
    return { value: hello };
  }

  async respondTo(request) {
    const { config, contexts } = this;
    const { value } = request;
    if (value) {
      const { command, context } = await selectMatch(config, contexts, value);
      const response = await call(context, command, value);
      return { value: response };
    } else {
      return { value: config.content.emptyRequest };
    }
  }
}

module.exports = Chat;

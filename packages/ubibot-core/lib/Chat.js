const History = require("./History");

class Chat {

  constructor(config, state = {}) {
    if (!config) throw new Error("Missing config for new Chat");
    this.config = config;
    this.history = new History(state.history);
  }

  getState() {
    const { history } = this;
    return {
      history: history.entries
    };
  }

  hello() {
    const { config, history } = this;
    const { content } = config;
    const { hello } = content;
    return history.recordAndReturn(hello);
  }

  async respondTo(request, respond) {
    const { config, history } = this;
    history.record(request);
    const respondFn = respond || config.start;
    const response = await respondFn(request);
    return typeof response === "function" ? this.respondTo(request, response) : history.recordAndReturn(response);
  }
}

module.exports = Chat;

const { botPrefix, userPrefix, delimiter } = require("./prefixes");

const createEntry = (prefix, msg) => `${Date.now()}${delimiter}${prefix}${delimiter}${msg}`;

class History {
  constructor(entries = []) {
    this.entries = entries;
  }

  record(request) {
    this.entries.push(createEntry(userPrefix, request));
  }

  recordAndReturn(response) {
    this.entries.push(createEntry(botPrefix, response));
    return response;
  }
}

module.exports = History;

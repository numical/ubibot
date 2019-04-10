const { botPrefix, userPrefix, delimiter } = require("../constants/prefixes");

const createEntry = (prefix, msg) => `${Date.now()}${delimiter}${prefix}${delimiter}${msg}`;

class History {
  constructor(entries = []) {
    this.entries = entries;
  }

  recordRequest(request) {
    this.entries.push(createEntry(userPrefix, request));
  }

  recordResponse(response) {
    this.entries.push(createEntry(botPrefix, response));
  }
}

module.exports = History;

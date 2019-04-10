const History = require("./History");
const Match = require("./Match");
const { POSSIBLE, PROBABLE } = require("../constants/matchingThresholds");

const nothingMatched = Match.definite(async (request, config) => config.content.notUnderstood);

class Chat {
  constructor(config, state = {}) {
    if (!config) throw new Error("Missing config for new Chat");
    this.config = config;
    this.contexts = [];
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
    history.recordResponse(hello);
    return hello;
  }

  async selectCommand(request) {
    const { config, contexts } = this;
    let selectedMatch;
    // look for probable command in user's contexts
    while (contexts.length > 0) {
      const currentContext = contexts.pop();
      const bestMatch = currentContext.match(request);
      if (bestMatch.score >= POSSIBLE) {
        contexts.push(currentContext);
        selectedMatch = bestMatch;
        break;
      }
    }
    // score engine in any context and select highest
    if (!selectedMatch) {
      const bestMatch = config.contexts
        .map(context => context.match(request))
        .reduce((bestMatch, match) => (bestMatch.score > match.score ? bestMatch : match));
      if (bestMatch.score >= PROBABLE) {
        contexts.push(bestMatch.context);
        selectedMatch = bestMatch;
      }
    }
    // catch anything else
    if (!selectedMatch) {
      selectedMatch = nothingMatched;
    }
    return selectedMatch.command;
  }

  async respondTo(request) {
    const { history } = this;
    history.recordRequest(request);
    const command = await this.selectCommand(request);
    const response = await command(request);
    history.recordResponse(response);
    return response;
  }
}

module.exports = Chat;

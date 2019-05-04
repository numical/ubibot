const { BrillPOSTagger, Lexicon, RuleSet, WordTokenizer } = require("@numical/ubibot-natural-language");
const History = require("./History");
const Match = require("./Match");
const { POSSIBLE, PROBABLE } = require("../constants/matchingThresholds");
const { orderTaggedWords } = require("./posTags");

const tokenizer = new WordTokenizer();
const lexicon = new Lexicon("EN", "N");
const ruleset = new RuleSet("EN");
const tagger = new BrillPOSTagger(lexicon, ruleset);

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

  identifyPrincipleConcept(request) {
    const tokens = tokenizer.tokenize(request);
    if (tokens.length === 1) {
      return tokens[0];
    } else {
      const { taggedWords } = tagger.tag(tokens);
      orderTaggedWords(taggedWords);
      return taggedWords[0].token;
    }
  }

  async selectCommand(request) {
    const { config, contexts } = this;
    const command = this.identifyPrincipleConcept(request);
    let selectedMatch;
    // look for probable command in user's contexts
    while (contexts.length > 0) {
      const currentContext = contexts.pop();
      const bestMatch = currentContext.match(command);
      if (bestMatch.score >= POSSIBLE) {
        contexts.push(currentContext);
        selectedMatch = bestMatch;
        break;
      }
    }
    // score engine in any context and select highest
    if (!selectedMatch) {
      const bestMatch = config.contexts
        .map(context => context.match(command))
        .reduce((bestMatch, match) => (bestMatch.score > match.score ? bestMatch : match));
      if (bestMatch.score >= PROBABLE) {
        contexts.push(bestMatch.context);
        selectedMatch = bestMatch;
      }
    }
    // catch anything else
    if (!selectedMatch) {
      selectedMatch = Match.definite(async () => config.content.notUnderstood);
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

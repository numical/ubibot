const { asyncLoad, BrillPOSTagger, RuleSet, WordTokenizer } = require("@numical/ubibot-natural");
const { POSSIBLE, PROBABLE } = require("../constants/matchingThresholds");
const History = require("./History");
const Match = require("./Match");
const { orderTaggedWords } = require("./posTags");

const words = new WordTokenizer();
const lexiconLoader = asyncLoad("Lexicon");
let tagger;

const tag = async tokens => {
  if (!tagger) {
    const Lexicon = await lexiconLoader;
    const lexicon = new Lexicon("EN", "N");
    const ruleset = new RuleSet("EN");
    tagger = new BrillPOSTagger(lexicon, ruleset);
  }
  return tagger.tag(tokens);
};

const identifyPrincipleConcept = async request => {
  const tokens = words.tokenize(request);
  if (tokens.length === 1) {
    return tokens[0];
  } else {
    const { taggedWords } = await tag(tokens);
    orderTaggedWords(taggedWords);
    return taggedWords[0].token;
  }
};

const selectMatch = async (config, contexts, request) => {
  const command = await identifyPrincipleConcept(request);
  let selectedMatch;
  // look for possible command in user's contexts
  while (contexts.length > 0) {
    const currentContext = contexts.pop();
    const bestMatch = currentContext.match(command);
    if (bestMatch.score >= POSSIBLE) {
      contexts.push(currentContext);
      selectedMatch = bestMatch;
      break;
    }
  }
  // score match in any context and select highest
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
    selectedMatch = Match.definite(async () => config.prefixes.notUnderstood);
  }
  return selectedMatch;
};

const callCommand = async (context, command, request) => {
  const response = await command(request, context);
  return typeof response === "function" ? callCommand(context, response, request) : response;
};

const methods = ["getState", "hello", "error", "respondTo"];

class Chat {
  constructor(config, state = {}) {
    if (!config) throw new Error("Missing config for new Chat");
    this.config = config;
    this.contexts = [];
    this.history = new History(state.history);
    methods.forEach(method => {
      this[method] = this[method].bind(this);
    });
  }

  getState() {
    const { history } = this;
    return {
      history: history.entries
    };
  }

  hello() {
    const { config, history } = this;
    const { hello } = config.content;
    history.recordResponse(hello);
    return hello;
  }

  error() {
    const { config, history } = this;
    const { error } = config.content;
    history.recordResponse(error);
    return error;
  }

  async respondTo(request) {
    const { config, contexts, history } = this;
    history.recordRequest(request);
    const { command, context } = await selectMatch(config, contexts, request);
    const response = await callCommand(context, command, request);
    history.recordResponse(response);
    return response;
  }
}

module.exports = Chat;

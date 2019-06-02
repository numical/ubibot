const clone = require("ramda/src/clone");
const { asyncLoad, BrillPOSTagger, RuleSet, WordTokenizer } = require("@numical/ubibot-natural");
const { POSSIBLE, PROBABLE } = require("./matchingThresholds");
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
    this.state = state;
    methods.forEach(method => {
      this[method] = this[method].bind(this);
    });
  }

  getState() {
    return clone(this.state);
  }

  hello() {
    const { config } = this;
    const { hello } = config.content;
    return hello;
  }

  error() {
    const { config } = this;
    const { error } = config.content;
    return error;
  }

  async respondTo(request) {
    const { config, contexts } = this;
    const { command, context } = await selectMatch(config, contexts, request);
    const response = await callCommand(context, command, request);
    return response;
  }
}

module.exports = Chat;

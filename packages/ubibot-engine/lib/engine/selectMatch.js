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
  // look for possible command in user's stateful contexts
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
      .reduce((bestMatch, match) => (match.score > bestMatch.score ? match : bestMatch));
    if (bestMatch.score >= PROBABLE) {
      if (bestMatch.context.isStateful()) {
        contexts.push(bestMatch.context);
      }
      selectedMatch = bestMatch;
    }
  }
  // catch anything else
  if (!selectedMatch) {
    selectedMatch = Match.definite(async () => config.content.notUnderstood);
  }
  return selectedMatch;
};

module.exports = selectMatch;

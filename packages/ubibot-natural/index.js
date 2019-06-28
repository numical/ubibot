const BrillPOSTagger = require("natural/lib/natural/brill_pos_tagger/lib/Brill_POS_Tagger");
const RuleSet = require("natural/lib/natural/brill_pos_tagger/lib/RuleSet");
const JaroWinklerDistance = require("natural/lib/natural/distance/jaro-winkler_distance");
const { WordTokenizer } = require("natural/lib/natural/tokenizers/regexp_tokenizer");

const asyncLoad = {
  Lexicon: () => import(/* webpackChunkName: "natural" */ "natural/lib/natural/brill_pos_tagger/lib/Lexicon")
};

module.exports = { asyncLoad, BrillPOSTagger, JaroWinklerDistance, RuleSet, WordTokenizer };

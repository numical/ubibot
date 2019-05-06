const BrillPOSTagger = require("natural/lib/natural/brill_pos_tagger/lib/Brill_POS_Tagger");
const Lexicon = require("natural/lib/natural/brill_pos_tagger/lib/Lexicon");
const RuleSet = require("natural/lib/natural/brill_pos_tagger/lib/RuleSet");
const JaroWinklerDistance = require("natural/lib/natural/distance/jaro-winkler_distance");
const { WordTokenizer } = require("natural/lib/natural/tokenizers/regexp_tokenizer");

module.exports = { BrillPOSTagger, JaroWinklerDistance, Lexicon, RuleSet, WordTokenizer };

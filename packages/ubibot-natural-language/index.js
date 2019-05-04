const { existsSync } = require("fs");
const findRoot = (path = "node_modules/natural/lib/natural") => (existsSync(path) ? path : findRoot(`../${path}`));
const root = findRoot();
const BrillPOSTagger = require(`${root}/brill_pos_tagger/lib/Brill_POS_Tagger`);
const Lexicon = require(`${root}/`);
const RuleSet = require(`${root}/brill_pos_tagger/lib/RuleSet`);
const { WordTokenizer } = require(`${root}/tokenizers/regexp_tokenizer`);
const JaroWinklerDistance = require(`${root}/distance/jaro-winkler_distance`);

module.exports = { BrillPOSTagger, JaroWinklerDistance, Lexicon, RuleSet, WordTokenizer };

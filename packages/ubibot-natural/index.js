const BrillPOSTagger = require("natural/lib/natural/brill_pos_tagger/lib/Brill_POS_Tagger");
const RuleSet = require("natural/lib/natural/brill_pos_tagger/lib/RuleSet");
const JaroWinklerDistance = require("natural/lib/natural/distance/jaro-winkler_distance");
const { WordTokenizer } = require("natural/lib/natural/tokenizers/regexp_tokenizer");
const Lexicon = require("natural/lib/natural/brill_pos_tagger/lib/Lexicon");

// try async import() and if not supported fallback to require()
const fallbackLoad = path =>
  new Promise((resolve, reject) => {
    import(/* webpackChunkName: "natural" */ path)
      .then(resolve)
      .catch(() => {
        try {
          // eslint-disable-next-line import/no-dynamic-require
          const loaded = require(path);
          resolve(loaded);
        } catch (err) {
          reject(err);
        }
      });
  });

const loads = {
  Lexicon: fallbackLoad.bind(null, "natural/lib/natural/brill_pos_tagger/lib/Lexicon")
};

const asyncLoad = async module => {
  const load = loads[module];
  if (load) {
    return load();
  } else {
    throw new Error(`Unknown async module '${module}`);
  }
};

module.exports = { asyncLoad, BrillPOSTagger, JaroWinklerDistance, RuleSet, WordTokenizer };

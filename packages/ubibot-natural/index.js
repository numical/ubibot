const BrillPOSTagger = require("natural/lib/natural/brill_pos_tagger/lib/Brill_POS_Tagger");
const RuleSet = require("natural/lib/natural/brill_pos_tagger/lib/RuleSet");
const JaroWinklerDistance = require("natural/lib/natural/distance/jaro-winkler_distance");
const { WordTokenizer } = require("natural/lib/natural/tokenizers/regexp_tokenizer");

const path = "natural/lib/natural/brill_pos_tagger/lib/Lexicon";

/*
 A hack to enable chunking and dynamic loading for the web app.
 'import' will work when transpiled by webpack but throw a 'Not Supported' exception in native node.
 Then we use a standard require BUT with a variable - which prevents webpack picking it up a second time.
 */
const asyncLoad = {
  Lexicon: () =>
    new Promise((resolve, reject) => {
      import(/* webpackChunkName: "natural" */ "natural/lib/natural/brill_pos_tagger/lib/Lexicon")
        .then(resolve)
        .catch(() => {
          try {
            // eslint-disable-next-line import/no-dynamic-require
            resolve(require(path));
          } catch (err) {
            reject(err);
          }
        });
    })
};

module.exports = { asyncLoad, BrillPOSTagger, JaroWinklerDistance, RuleSet, WordTokenizer };

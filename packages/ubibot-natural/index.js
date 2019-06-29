const BrillPOSTagger = require("natural/lib/natural/brill_pos_tagger/lib/Brill_POS_Tagger");
const RuleSet = require("natural/lib/natural/brill_pos_tagger/lib/RuleSet");
const JaroWinklerDistance = require("natural/lib/natural/distance/jaro-winkler_distance");
const { WordTokenizer } = require("natural/lib/natural/tokenizers/regexp_tokenizer");

const path = "natural/lib/natural/brill_pos_tagger/lib/Lexicon";

/*
 A hack to enable chunking and dynamic loading for the web app.
 'import' will work when transpiled by webpack but throw a 'Not Supported' exception in native Node.
 So for native Node we use a standard require BUT with a variable.  This prevents webpack picking it up a second time.
 */
const loadLexicon = new Promise((resolve, reject) => {
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
});

const tagger = new Promise((resolve, reject) => {
  loadLexicon
    .then(Lexicon => {
      try {
        const lexicon = new Lexicon("EN", "N");
        const ruleset = new RuleSet("EN");
        const tagger = new BrillPOSTagger(lexicon, ruleset);
        const tag = tagger.tag.bind(tagger);
        resolve(tag);
      } catch (err) {
        reject(err);
      }
    })
    .catch(reject);
});

module.exports = { tagger, JaroWinklerDistance, WordTokenizer };

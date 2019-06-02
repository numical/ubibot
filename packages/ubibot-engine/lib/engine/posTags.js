/*
 Parts of Speech Tokens
 See:
  - https://www.npmjs.com/package/natural#pos-tagger - for the concept
  - https://github.com/neopunisher/pos-js - for the lexicon used
 */

// default tag, noun plural, noun singular
const INCREASING_SIGNIFICANCE = ["N", "NNS", "NN"];

const orderTaggedWords = taggedWords =>
  taggedWords.sort(
    ({ tag: tag1 }, { tag: tag2 }) => INCREASING_SIGNIFICANCE.indexOf(tag2) - INCREASING_SIGNIFICANCE.indexOf(tag1)
  );

module.exports = { orderTaggedWords };

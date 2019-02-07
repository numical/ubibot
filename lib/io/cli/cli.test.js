const { EOL } = require("os");
const MemoryStream = require("memorystream");
const { test } = require("../../test/initialiseUnitTest");
const loadScripts = require("../../test/loadScripts");
const parseScript = require("../../test/parseScript");
const content = require("../../content/content");
const { start } = require("./cli");

const { botPrefix, prefixDelimiter, userPrefix } = content.io.console;

const notUserPrompt = value => value !== `${userPrefix}${prefixDelimiter}`;

const runOutputTests = (values, tests) => {
  if (values.length > 0 && tests.length > 0) {
    const value = values.shift();
    const test = tests.shift();
    test(value);
    runOutputTests(values, tests);
  }
};

const runTestScript = (script, test) => {
  const stdin = new MemoryStream();
  const stdout = new MemoryStream();
  const cachedOut = [];
  const cachedOutTests = [];
  stdout.on("data", chunk => {
    const value = chunk.toString();
    if (notUserPrompt(value)) {
      cachedOut.push(value);
      runOutputTests(cachedOut, cachedOutTests);
      if (cachedOut.length === 0 && cachedOutTests.length === 0) {
        test.end();
      }
    }
  });
  const userEnters = value => stdin.write(`${value}${EOL}`);
  const botReplies = value => {
    const expected = `${botPrefix}${prefixDelimiter}${value}${EOL}`;
    const outputTest = actual => test.equal(actual, expected, `'${actual}' expected to be '${expected}`);
    cachedOutTests.push(outputTest);
    runOutputTests(cachedOut, cachedOutTests);
  };
  start({ stdin, stdout });
  parseScript(script, userEnters, botReplies);
};

test("CLI tests", async t => {
  const scripts = await loadScripts();
  t.plan(scripts.length);
  Object.entries(scripts).forEach(([name, script]) => {
    t.test(`running test script '${name}'`, test => {
      runTestScript(script, test);
    });
  });
});

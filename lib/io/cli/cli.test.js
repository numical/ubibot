const { EOL } = require("os");
const MemoryStream = require("memorystream");
const { test } = require("../../test/initialiseUnitTest");
const loadScripts = require("../../test/loadScripts");
const content = require("../../content/content");
const { bot, delimiter, user } = require("../../test/scriptPrefixes");
const { start } = require("./cli");

const { botPrefix, userPrefix } = content.io.console;

const notUserPrompt = value => value !== userPrefix;

const runOutputTests = testContext => {
  const { values, assertions } = testContext;
  if (values.length > 0 && assertions.length > 0) {
    const value = values.shift();
    const assertion = assertions.shift();
    assertion(value);
    runOutputTests(testContext);
  }
};

const botOutput = (testContext, value) => {
  const { test, values, assertions } = testContext;
  if (notUserPrompt(value)) {
    values.push(value);
    runOutputTests(testContext);
    if (values.length === 0 && assertions.length === 0) {
      test.end();
    }
  }
};

const addAssertion = (testContext, value) => {
  const { test, assertions } = testContext;
  const expected = `${botPrefix}${value}${EOL}`;
  const assertion = actual => test.equal(actual, expected, `'${actual}' expected to be '${expected}'`);
  assertions.push(assertion);
  runOutputTests(testContext);
};

const runTestScript = (script, test) => {
  const stdin = new MemoryStream();
  const stdout = new MemoryStream();
  const testContext = Object.freeze({ assertions: [], test, values: [] });
  stdout.on("data", chunk => botOutput(testContext, chunk.toString()));
  start({ stdin, stdout });
  script.forEach(line => {
    const [source, value] = line.split(delimiter);
    switch (source) {
      case bot:
        addAssertion(testContext, value);
        break;
      case user:
        stdin.write(`${value}${EOL}`);
        break;
      default:
        throw new Error(`Invalid script line: '${line}'`);
    }
  });
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

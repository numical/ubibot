const { EOL } = require("os");
const MemoryStream = require("memorystream");
const { test } = require("tape");
const { loadScripts } = require("@numical/ubibot-test");
// note: two sets of different but similarly named prefixes here...
const { prefixes: scriptPrefixes } = require("@numical/ubibot-util");
const cliPrefixes = require("./cliPrefixes");
const startCLI = require("./startCLI");

const runTestScript = (botFactory, script, test) => {
  const stdin = new MemoryStream();
  const stdout = new MemoryStream();
  const assertions = [];
  const values = [];

  const runOutputTests = () => {
    if (values.length > 0 && assertions.length > 0) {
      const value = values.shift();
      const assertion = assertions.shift();
      assertion(value);
      runOutputTests();
    }
  };

  const botOutput = chunk => {
    const { userPrefix } = cliPrefixes;
    const value = chunk.toString();
    if (value !== userPrefix) {
      // not user prompt
      values.push(value);
      runOutputTests();
      if (values.length === 0 && assertions.length === 0) {
        test.end();
      }
    }
  };

  const addAssertion = value => {
    const { botPrefix } = cliPrefixes;
    const expected = `${botPrefix}${value}${EOL}`;
    const assertion = actual => test.equal(actual, expected, `'${actual}' expected to be '${expected}'`);
    assertions.push(assertion);
    runOutputTests();
  };

  const parseScriptLine = line => {
    const { botPrefix, userPrefix, delimiter } = scriptPrefixes;
    const [source, value] = line.split(delimiter);
    switch (source) {
      case botPrefix:
        addAssertion(value);
        break;
      case userPrefix:
        stdin.write(`${value}${EOL}`);
        break;
      default:
        throw new Error(`Invalid script line: '${line}'`);
    }
  };

  stdout.on("data", botOutput);
  startCLI(botFactory, { stdin, stdout });
  script.forEach(parseScriptLine);
};

const testCLI = async (name, botFactory, scriptsDir) => {
  test(name, async testSuite => {
    const scripts = await loadScripts(scriptsDir);
    testSuite.plan(scripts.length);
    Object.entries(scripts).forEach(([name, script]) => {
      testSuite.test(`running test script '${name}'`, scriptTest => {
        runTestScript(botFactory, script, scriptTest);
      });
    });
  });
};

module.exports = testCLI;

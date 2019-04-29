const { EOL } = require("os");
const MemoryStream = require("memorystream");
const { test } = require("tape");
const { loadScripts } = require("@numical/ubibot-test");
const { prefixes } = require("@numical/ubibot-core");
const { startCLI } = require("../lib/cli");

const { botPrefix, userPrefix, delimiter } = prefixes;

const runTestScript = (config, script, test) => {
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
    const value = chunk.toString();
    const { userPrefix } = config.content.io.console;
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
    const { botPrefix } = config.content.io.console;
    const expected = `${botPrefix}${value}${EOL}`;
    const assertion = actual => test.equal(actual, expected, `'${actual}' expected to be '${expected}'`);
    assertions.push(assertion);
    runOutputTests();
  };

  const parseScriptLine = line => {
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
  startCLI(config, { stdin, stdout });
  script.forEach(parseScriptLine);
};

const testCLI = async (name, config) => {
  test(name, async testSuite => {
    const { scriptsDir } = config;
    const scripts = await loadScripts(scriptsDir);
    testSuite.plan(scripts.length);
    Object.entries(scripts).forEach(([name, script]) => {
      testSuite.test(`running test script '${name}'`, scriptTest => {
        runTestScript(config, script, scriptTest);
      });
    });
  });
};

module.exports = {
  testCLI
};

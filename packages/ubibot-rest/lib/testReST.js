const { EOL } = require("os");
const request = require("supertest");
const { test } = require("tape");
const { loadScripts } = require("@numical/ubibot-test");
const { prefixes } = require("@numical/ubibot-util/");
const startReST = require("./startReST");
const endPoints = require("./endPoints");

const { botPrefix, userPrefix, delimiter } = prefixes;

let id = 0;
const idGenerator = () => `${++id}`;

const testBotResponse = ({ response, botScript, test }) => {
  const { botId, botResponse: actual } = response.body;
  const expected = botScript.join(EOL);
  botScript.splice(0);
  test.equal(botId, `${id}`, `botId ${botId} expected to be ${id}`);
  test.equal(actual, expected, `'${actual}' expected to be '${expected}'`);
  return botId;
};

const runTestScript = async ({ app, script, test }) => {
  const botScript = [];
  let response = await app.post(endPoints.bots);
  for (const line of script) {
    const [source, value] = line.split(delimiter);
    switch (source) {
      case userPrefix:
        // test previous response
        const botId = testBotResponse(response, botScript, test);
        // get next response
        response = await app.post(endPoints.bot(botId)).send({ userRequest: value });
        break;
      case botPrefix:
        botScript.push(value);
        break;
      default:
        throw new Error(`Invalid script line: '${line}'`);
    }
  }
  // the last script line *should be* from the bot, hence a final asserion to make
  if (botScript.length > 0) {
    testBotResponse({ response, botScript, test });
  }
  test.end();
};

const testReST = async ({ name, config, scriptsDir, options }) => {
  test(name, async testSuite => {
    const scripts = await loadScripts(scriptsDir);
    testSuite.plan(scripts.length);
    const server = startReST(config, { idGenerator, ...options });
    try {
      const app = await request(server);
      Object.entries(scripts).forEach(([name, script]) => {
        testSuite.test(`running test script '${name}'`, scriptTest => {
          runTestScript({ app, script, scriptTest });
        });
      });
    } finally {
      server.close();
    }
  });
};

module.exports = testReST;

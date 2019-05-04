const { EOL } = require("os");
const request = require("supertest");
const { test } = require("tape");
const { loadScripts } = require("@numical/ubibot-test/");
const { prefixes } = require("@numical/ubibot-core/");
const { startReST } = require("../lib/httpServer");
const endPoints = require("../lib/endPoints");

const { botPrefix, userPrefix, delimiter } = prefixes;

let id = 0;
const idGenerator = () => `${++id}`;

const testBotResponse = (response, botScript, test) => {
  const { bot: actual, chatId } = response.body;
  const expected = botScript.join(EOL);
  botScript.splice(0);
  test.equal(chatId, `${id}`, `chatId ${chatId} expected to be ${id}`);
  test.equal(actual, expected, `'${actual}' expected to be '${expected}'`);
  return chatId;
};

const runTestScript = async (app, script, test) => {
  const botScript = [];
  let response = await app.post(endPoints.newChat);
  for (const line of script) {
    const [source, value] = line.split(delimiter);
    switch (source) {
      case userPrefix:
        // test previous response
        const chatId = testBotResponse(response, botScript, test);
        // get next response
        response = await app.post(endPoints.chat(chatId)).send({ user: value });
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
    testBotResponse(response, botScript, test);
  }
  test.end();
};

const testReST = async (name, config) => {
  test(name, async testSuite => {
    const { scriptsDir } = config;
    const scripts = await loadScripts(scriptsDir);
    testSuite.plan(scripts.length);
    const server = startReST(config, { idGenerator });
    try {
      const app = await request(server);
      Object.entries(scripts).forEach(([name, script]) => {
        testSuite.test(`running test script '${name}'`, scriptTest => {
          runTestScript(app, script, scriptTest);
        });
      });
    } finally {
      server.close();
    }
  });
};

module.exports = { testReST };

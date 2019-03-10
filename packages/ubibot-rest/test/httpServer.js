const { EOL } = require("os");
const request = require("supertest");
const { loadScripts, scriptPrefixes } = require("../../ubibot-test/api");
const { startReST } = require("../lib/httpServer");
const endPoints = require("../lib/endPoints");

const { bot, delimiter, user } = scriptPrefixes;

let id = 0;
const idGenerator = () => `${++id}`;

const runTestScript = async (app, script, test) => {
  const botScript = [];
  let response = await app.post(endPoints.newConversation);
  for (const line of script) {
    const [source, value] = line.split(delimiter);
    switch (source) {
      case user:
        // lib previous response
        const { bot: actual, conversationId } = response.body;
        const expected = botScript.join(EOL);
        botScript.splice(0);
        test.equal(conversationId, `${id}`, `conversationId ${conversationId} expected to be ${id}`);
        test.equal(actual, expected, `'${actual}' expected to be '${expected}'`);
        // get next response
        response = await app.post(endPoints.conversation(conversationId)).send({ user: value });
        break;
      case bot:
        botScript.push(value);
        break;
      default:
        throw new Error(`Invalid script line: '${line}'`);
    }
  }
  test.end();
};

const testReST = config => async test => {
  const { scriptsDir } = config;
  const scripts = await loadScripts(scriptsDir);
  test.plan(scripts.length);
  const server = startReST(config, { idGenerator });
  try {
    const app = await request(server);
    Object.entries(scripts).forEach(([name, script]) => {
      test.test(`running test script '${name}'`, t => {
        runTestScript(app, script, t);
      });
    });
  } finally {
    server.close();
  }
};

module.exports = { testReST };

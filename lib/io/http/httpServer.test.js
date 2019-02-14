const { EOL } = require("os");
const request = require("supertest");
const { test } = require("../../test/initialiseUnitTest");
const { start } = require("./httpServer");
const endPoints = require("./endPoints");
const loadScripts = require("../../test/loadScripts");
const prefixes = require("../../test/scriptPrefixes");

let id = 0;
const idGenerator = () => `${++id}`;

const runTestScript = async (app, script, test) => {
  const botScript = [];
  let response = await app.post(endPoints.newConversation);
  for (const line of script) {
    const [source, value] = line.split(prefixes.delimiter);
    switch (source) {
      case prefixes.user:
        // test previous response
        const { bot: actual, conversationId } = response.body;
        const expected = botScript.join(EOL);
        botScript.splice(0);
        test.equal(conversationId, `${id}`, `conversationId ${conversationId} expected to be ${id}`);
        test.equal(actual, expected, `'${actual}' expected to be '${expected}'`);
        // get next response
        response = await app.post(endPoints.conversation(conversationId)).send({ user: value });
        break;
      case prefixes.bot:
        botScript.push(value);
        break;
      default:
        throw new Error(`Invalid script line: '${line}'`);
    }
  }
  test.end();
};

test("HTTP server tests", async t => {
  const scripts = await loadScripts();
  t.plan(scripts.length);
  const server = start({ idGenerator });
  try {
    const app = await request(server);
    Object.entries(scripts).forEach(([name, script]) => {
      t.test(`running test script '${name}'`, test => {
        runTestScript(app, script, test);
      });
    });
  } finally {
    server.close();
  }
});

const { EOL } = require("os");
const request = require("supertest");
const { test } = require("../../test/initialiseUnitTest");
const { start } = require("./httpServer");
const endPoints = require("./endPoints");
const content = require("../../content/content");

let id = 0;
const idGenerator = () => `${++id}`;

const hello = content.io.hello.split(EOL);

test("HTTP Server", async t => {
  const server = start({ idGenerator });
  const app = await request(server);
  try {
    let response = await app.get(endPoints.healthCheck);
    t.equal(response.statusCode, 200, "GET healthcheck reports OK");

    let expected = {
      botSays: [...hello, "Hello"],
      conversationId: "1"
    };
    response = await app.post(endPoints.newConversation).send({ userSays: "Hello" });
    t.equal(response.statusCode, 200, "POST message reports OK");
    t.deepEqual(response.body, expected, "POST message echoes with initial hello");

    expected = {
      botSays: ["World"],
      conversationId: "1"
    };
    response = await app.post(endPoints.conversation("1")).send({ userSays: "World" });
    t.deepEqual(response.body, expected, "POST message echoes without subsequent hello");

    t.end();
  } finally {
    server.close();
  }
});

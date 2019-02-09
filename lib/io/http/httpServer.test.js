const request = require("supertest");
const { test } = require("../../test/initialiseUnitTest");
const { start } = require("./httpServer");

test("HTTP Server", async t => {
  const server = start();
  const app = await request(server);
  try {
    let response = await app.get("/health");
    t.equal(response.statusCode, 200, "GET healthcheck reports OK");

    const toSend = { user: "Hello" };
    const toReceive = { bot: "Hello" };
    response = await app.post("/conversation").send(toSend);
    t.equal(response.statusCode, 200, "POST message reports OK");
    t.deepEqual(response.body, toReceive, "POST message echoes");

    t.end();
  } finally {
    server.close();
  }
});

const request = require("supertest");
const { test } = require("../../test/initialiseUnitTest");
const { start } = require("./httpServer");

test("HTTP Server", async t => {
  const server = start();
  try {
    const response = await request(server).get("/health");
    t.equals(200, response.statusCode, "healthcheck reports OK");
    const response2 = await request(server).get("/health");
    t.equals(200, response2.statusCode, "healthcheck still reports OK");
    t.end();
  } finally {
    server.close();
  }
});

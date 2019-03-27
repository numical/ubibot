const { test } = require("tape");
const respondTo = require("../lib/core/respondTo");

test("respondTo echoes", async t => {
  const request = "wibble";
  const echo = arg => arg;
  const response = request;
  t.equal(await respondTo(request, echo), response, "respondTo returns correct response");
  t.end();
});

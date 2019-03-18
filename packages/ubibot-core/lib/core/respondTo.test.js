const { test } = require("@numical/ubibot-test");
const respondTo = require("./respondTo");

test("respondTo echoes", async t => {
  const request = "wibble";
  const response = request;
  t.equal(await respondTo(request), response, "respondTo returns correct response");
  t.end();
});

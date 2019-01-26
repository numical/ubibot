const { test } = require("../unit-test/init");
const respondTo = require("./respondTo");

test("respondTo echoes", async t => {
  const request = "wibble";
  const response = request;
  t.equal(
    await respondTo(request),
    response,
    "respondTo returns correct response"
  );
  t.end();
});

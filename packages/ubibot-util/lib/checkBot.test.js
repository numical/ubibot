const { test } = require("tape");
const checkBot = require("./checkBot");

const valid = {
  hello: () => Promise.resolve("Hello"),
  respondTo: () => Promise.resolve("A response")
};

test("checkBot", t => {
  t.throws(() => checkBot(), "Bot Missing");

  let missingHello = { ...valid };
  delete missingHello.hello;
  t.throws(() => checkBot(missingHello), "Bot missing 'hello' method.");

  let wrongHello = { ...valid };
  wrongHello.hello = "hello";
  t.throws(() => checkBot(wrongHello), "Bot missing 'hello' method.");

  t.end();
});

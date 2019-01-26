const { test } = require("../unit-test/init");
const defaults = require("../../content/default.json");
const getContent = require("./getContent");

test("getContent exposes default values", t => {
  Object.entries(defaults).forEach(([key, value]) => {
    t.equal(
      getContent(key),
      defaults[key],
      `getContent not serving content key '${key}'`
    );
  });
  t.end();
});

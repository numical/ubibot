const { test } = require("tape");
const loadScripts = require("./loadScripts");

test("loadScripts", async t => {
  const scripts = await loadScripts();
  t.ok(scripts, "returns a 'scripts' object");
  const names = Object.keys(scripts);
  t.equal(names.length, 2, "matches number of files");
  t.ok(names.includes("echo1"), "includes the 'echo1' script");
  t.ok(Array.isArray(scripts["echo1"]), "contents are an array");
  t.ok(scripts["echo1"].length > 0, "contents are not empty");
  t.end();
});

const path = require("path");
const { test } = require("tape");
const loadScripts = require("../lib/loadScripts");

const dir = path.resolve(__dirname, "scripts");

test("loadScripts", async t => {
  const scripts = await loadScripts(dir);
  t.ok(scripts, "returns a 'scripts' object");
  const names = Object.keys(scripts);
  t.equal(names.length, 2, "matches number of files");
  t.ok(names.includes("script1"), "includes the 'script1' script");
  t.ok(Array.isArray(scripts["script1"]), "contents are an array");
  t.equals(scripts["script1"].length, 3, "contents represent 3 lines");
  t.end();
});

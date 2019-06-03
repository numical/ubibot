const path = require("path");
const { test } = require("tape");
const loadScripts = require("./loadScripts");

const dir = path.resolve(__dirname, "../scripts");

test("loadScripts", async t => {
  const scripts = await loadScripts(dir);
  t.ok(scripts, "returns a 'scripts' object");
  const names = Object.keys(scripts);
  t.equal(names.length, 8, "matches number of generated scripts");
  t.ok(names.includes("script1"), "includes the 'script1' script");
  t.ok(names.includes("folder1/script3"), "includes the nested folder1 script");
  t.ok(names.includes("folder1/folder2/script4"), "includes the doubly nested folder2 script");
  t.ok(names.includes("folder3/script5"), "includes the second nested folder3 script");
  t.notOk(names.includes("folder3/script6"), "does not include ignored script");
  t.ok(names.includes("folder3/script7.0"), "includes option 0 of script with one set of options");
  t.ok(names.includes("folder3/script7.1"), "includes option 1 of script with one set of options");
  t.ok(names.includes("folder3/script7.2"), "includes option 2 of script with one set of options");
  t.ok(Array.isArray(scripts["script1"]), "contents are an array");
  t.equals(scripts["script1"].length, 3, "contents represent 3 lines");
  t.equals(scripts["script2"].length, 3, "commments are not included in contents");
  t.end();
});

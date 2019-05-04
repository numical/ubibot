const { test } = require("tape");
const allDependencies = require("./index");

const testDependency = (t, [name, value]) => {
  t.ok(value, `dependency '${name}' is successfully imported`);
};

test("natural language dependencies", t => {
  const dependencies = Object.entries(allDependencies);
  t.plan(dependencies.length);
  dependencies.forEach(testDependency.bind(null, t));
});

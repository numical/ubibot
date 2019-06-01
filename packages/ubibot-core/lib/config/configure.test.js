const { test } = require("tape");
const configure = require("./configure");
const defaultConfig = require("./defaultConfig");

const testFn = () => {};

const shallowConfig = {
  start: testFn
};

const deepConfig = {
  content: {
    hello: "test Hello"
  }
};

test("configure", t => {
  let config = configure();
  t.deepEqual(config, defaultConfig, "supplies default config if not configured");

  t.throws(
    () => {
      configure(shallowConfig);
    },
    /Conguration changed after it has been read./,
    "guards against reconfiguring after reading"
  );

  t.doesNotThrow(() => {
    configure(shallowConfig, true);
  }, "guard can be overridden with a parameter.");

  config = configure();
  t.equal(config.start, testFn, "shallow configuration works");

  config = configure(deepConfig, true);
  t.equal(config.content.hello, deepConfig.content.hello, "deep configuration works");
  t.equal(config.content.error, defaultConfig.content.error, "deep configuration does not affect other values");

  t.end();
});

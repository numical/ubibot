const { test } = require("tape");
const configure = require("../lib/config/configure");
const defaultConfig = require("../lib/config/defaultConfig");

const testFn = () => {};

const shallowConfig = {
  start: testFn
};

const deepConfig = {
  content: {
    io: {
      console: {
        botPrefix: "Test value"
      }
    }
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
  t.equal(config.content.io.console.botPrefix, deepConfig.content.io.console.botPrefix, "deep configuration works");
  t.equal(
    config.content.io.console.userPrefix,
    defaultConfig.content.io.console.userPrefix,
    "deep configuration does not affect other values"
  );

  t.end();
});

const { series } = require("nps-utils");

module.exports = {
  scripts: {
    default: "nps run.console",
    commit: series("nps test", "npx git-cz"),
    run: {
      console: "node lib/io/console/in"
    },
    test: "tape lib/**/*.test.js | tap-spec"
  }
};
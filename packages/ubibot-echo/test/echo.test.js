const { test } = require("../../ubibot-test/api");
const { testCLI } = require("../../ubibot-cli/api");
const { testReST } = require("../../ubibot-rest/api");
const config = require("../lib/config/config");

test("Domain: echo; IO: CLI", testCLI(config));
test("Domain: echo; IO: ReST", testReST(config));

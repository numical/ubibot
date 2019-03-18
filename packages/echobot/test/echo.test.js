const { test } = require("@numical/ubibot-test");
const { testCLI } = require("@numical/ubibot-cli");
const { testReST } = require("@numical/ubibot-rest");
const config = require("../lib/config/config");

test("Domain: echo; IO: CLI", testCLI(config));
test("Domain: echo; IO: ReST", testReST(config));

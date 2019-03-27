const { testCLI } = require("@numical/ubibot-cli");
const { testReST } = require("@numical/ubibot-rest");
const config = require("../lib/config/config");

testCLI("Domain: echo; IO: CLI", config);
testReST("Domain: echo; IO: ReST", config);

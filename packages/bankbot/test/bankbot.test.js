const { testCLI } = require("@numical/ubibot-cli");
const { testReST } = require("@numical/ubibot-rest");
const config = require("../lib/config/config");

testCLI("Domain: bankbot; IO: CLI", config);
testReST("Domain: bankbot; IO: ReST", config);

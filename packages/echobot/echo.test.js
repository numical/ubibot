const { testCLI } = require("@numical/ubibot-channel-cli/");
const { config } = require("@numical/ubibot-domain-echo/");

testCLI("Domain: echo; Channel: CLI", config);

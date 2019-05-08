const path = require("path");
const { testCLI } = require("@numical/ubibot-channel-cli/");
const { config } = require("@numical/ubibot-domain-echo/");

const scriptsDir = path.resolve(__dirname, "./scripts");

testCLI("Domain: echo; Channel: CLI", config, scriptsDir);

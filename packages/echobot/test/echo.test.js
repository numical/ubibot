const { testCLI } = require("@numical/ubibot-cli");
const { testReST } = require("@numical/ubibot-rest");
const config = require("../lib/config");

const possibleTests = {
  CLI: testCLI.bind(null, "Domain: echo; Channel: CLI", config),
  REST: testReST.bind(null, "Domain: echo; Channel: ReST", config)
};

const channel = process.env.UBIBOT_CHANNEL;
if (!channel) {
  Object.values(possibleTests).forEach(test => test());
} else {
  possibleTests[channel] && possibleTests[channel]();
}

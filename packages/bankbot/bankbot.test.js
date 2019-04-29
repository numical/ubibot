const { testCLI } = require("@numical/ubibot-channel-cli");
const { testReST } = require("@numical/ubibot-channel-rest");
const { config } = require("@numical/ubibot-domain-bank");

const possibleTests = {
  CLI: testCLI.bind(null, "Domain: bankbot; Channel: CLI", config),
  REST: testReST.bind(null, "Domain: bankbot; Channel: ReST", config)
};

const channel = process.env.UBIBOT_CHANNEL;
if (!channel) {
  // run all possible tests
  Object.values(possibleTests).forEach(test => test());
} else {
  // run defined test if it exists
  possibleTests[channel] && possibleTests[channel]();
}

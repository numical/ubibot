#!/usr/bin/env node

const { startCLI } = require("@numical/ubibot-channel-cli");
const { startReST } = require("@numical/ubibot-channel-rest");
const { config } = require("@numical/ubibot-domain-bank");

const channel = process.env.UBIBOT_CHANNEL;
if (channel === "REST") {
  startReST(config);
} else {
  startCLI(config);
}

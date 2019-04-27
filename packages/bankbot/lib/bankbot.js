#!/usr/bin/env node

const { startCLI } = require("@numical/ubibot-cli");
const { startReST } = require("@numical/ubibot-rest");

const config = require("./config");

const channel = process.env.UBIBOT_CHANNEL;
if (channel === "REST") {
  startReST(config);
} else {
  startCLI(config);
}

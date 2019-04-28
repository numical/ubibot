#!/usr/bin/env node

const { startCLI } = require("@numical/ubibot-channel-cli");
const { config } = require("@numical/ubibit-domain-echo");

startCLI(config);

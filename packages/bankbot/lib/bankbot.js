#!/usr/bin/env node

const { startCLI } = require("@numical/ubibot-cli");
const config = require("./config/config");

startCLI(config);

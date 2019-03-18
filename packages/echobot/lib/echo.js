#!/usr/bin/env node

const { startCLI } = require("@numical/ubibot-cli");
const config = require("../lib/config/config");

startCLI(config);

/* global UBIBOT_SOURCE */

import "core-js/stable";
import "regenerator-runtime/runtime";
import React from "react";
import { render } from "react-dom";
import App from "./lib/App";
const { bot } = require(UBIBOT_SOURCE); // defined in webpack.config.js

render(<App bot={bot} />, document.getElementById("bot"));

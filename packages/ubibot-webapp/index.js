/* eslint-disable */

import "core-js/stable";
import "regenerator-runtime/runtime";
import React from "react";
import { render } from "react-dom";
import App from "./lib/App";

const botFactory = require(UBIBOT_SOURCE); // defined in webpack.config.js

render(<App botFactory={botFactory} />, document.getElementById("bot"));

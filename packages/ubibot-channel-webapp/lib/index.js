import "core-js/stable";
import "regenerator-runtime/runtime";
import React from "react";
import { render } from "react-dom";
import { Chat } from "@numical/ubibot-core/lib";
import App from "./components/App";
import config from "./webbot/config";

const chat = new Chat(config);

render(<App chat={chat} />, document.getElementById("app"));

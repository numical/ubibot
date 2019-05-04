import React, { Component } from "react";
import { Widget, addResponseMessage } from "react-chat-widget";
import { Chat } from "@numical/ubibot-core/";
import config from "../webbot/config";
import "react-chat-widget/lib/styles.css";

/*
const options = {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  }
};
*/

class App extends Component {
  constructor(props) {
    super(props);
    /*
    this.state = {
      chatId: undefined,
      endpoint: "http://localhost:1971/chat"
    };
    this.setState = this.setState.bind(this);
         */
    this.chat = new Chat(config);
  }

  /*
  async chat(msg) {
    try {
      console.log("chat", msg);
      const { setState, state } = this;
      const { chatId, endpoint } = state;
      const url = chatId ? `${endpoint}/${chatId}` : endpoint;
      const body = msg ? JSON.stringify({ user: msg }) : null;
      const response = await fetch(url, { ...options, body });
      if (response.ok) {
        const { bot, chatId } = await response.json();
        setState({ chatId }, () => addResponseMessage(bot));
      } else {
        const { status, statusText } = response;
        addResponseMessage(`There was an failure talking to the server, code: ${status}, message: ${statusText}`);
      }
    } catch (err) {
      addResponseMessage(`There was an error talking to the server, msg: ${err}`);
    }
  }

   */

  componentDidMount() {
    const { chat } = this;
    addResponseMessage(chat.hello());
  }

  async handleNewUserMessage(request) {
    const { chat } = this;
    const response = await chat.respondTo(request);
    addResponseMessage(response);
  }

  render() {
    const props = {
      handleNewUserMessage: this.handleNewUserMessage,
      title: "Ubibot Web App",
      subtitle: ""
    };
    return (
      <div className="App">
        <Widget {...props} />
      </div>
    );
  }
}

export default App;

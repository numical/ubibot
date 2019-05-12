import React, { Component } from "react";
import PropTypes from "prop-types";
import { Widget, addResponseMessage } from "react-chat-widget";
import { Chat } from "@numical/ubibot-core/"; // only needed for PropTypes check
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
    this.handleNewUserMessage = this.handleNewUserMessage.bind(this);
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
    const { chat } = this.props;
    addResponseMessage(chat.hello());
  }

  async handleNewUserMessage(request) {
    const { chat } = this.props;
    try {
      const response = await chat.respondTo(request);
      addResponseMessage(response);
    } catch (err) {
      console.log("App.handleNewUserMessage:", err);
      addResponseMessage(chat.error());
    }
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

App.propTypes = {
  chat: PropTypes.instanceOf(Chat).isRequired
};

export default App;

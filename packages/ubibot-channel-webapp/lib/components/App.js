import React, { Component } from "react";
import PropTypes from "prop-types";
import { Widget, addResponseMessage } from "react-chat-widget";
import { Chat } from "@numical/ubibot-core/"; // only needed for PropTypes check
import "react-chat-widget/lib/styles.css";
import "./App.css";

class App extends Component {
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
      handleNewUserMessage: this.handleNewUserMessage.bind(this),
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

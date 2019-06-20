import React, { Component } from "react";
import PropTypes from "prop-types";
import { Widget, addResponseMessage, dropMessages } from "react-chat-widget";
import { checkBot } from "@numical/ubibot-util";
import "react-chat-widget/lib/styles.css";
import "./App.css";

class App extends Component {
  async startChat() {
    try {
      const { botFactory } = this.props;
      const bot = botFactory();
      checkBot(bot);
      this.setState({ bot });
      addResponseMessage(await bot.hello());
    } catch (err) {
      addResponseMessage(err.message);
    }
  }

  async userSays(request) {
    const { bot } = this.state;
    try {
      const response = await bot.respondTo(request);
      addResponseMessage(response);
    } catch (err) {
      dropMessages();
      addResponseMessage(err.message);
      this.startChat();
    }
  }

  async componentDidMount() {
    this.startChat();
  }

  render() {
    const props = {
      handleNewUserMessage: this.userSays.bind(this),
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
  botFactory: PropTypes.func.isRequired
};

export default App;

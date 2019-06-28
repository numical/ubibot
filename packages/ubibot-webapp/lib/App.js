import React, { Component } from "react";
import PropTypes from "prop-types";
import { Widget, addResponseMessage, dropMessages } from "react-chat-widget";
import { checkBot, EOL } from "@numical/ubibot-util";
import "react-chat-widget/lib/styles.css";
import "./App.css";

const display = msg => {
  msg.split(EOL).forEach(addResponseMessage);
};

class App extends Component {
  async startChat() {
    try {
      const { botFactory } = this.props;
      const bot = botFactory();
      checkBot(bot);
      this.setState({ bot });
      const { value } = await bot.hello();
      display(value);
    } catch (err) {
      display(err.message);
    }
  }

  async userSays(request) {
    const { bot } = this.state;
    try {
      const { value } = await bot.respondTo({ value: request });
      display(value);
    } catch (err) {
      dropMessages();
      display(err.message);
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

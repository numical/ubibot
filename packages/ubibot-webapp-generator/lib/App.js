import React, { Component } from "react";
import PropTypes from "prop-types";
import { Widget, addResponseMessage } from "react-chat-widget";
import "react-chat-widget/lib/styles.css";
import "./App.css";

class App extends Component {
  componentDidMount() {
    const { bot } = this.props;
    addResponseMessage(bot.hello());
  }

  async handleNewUserMessage(request) {
    const { bot } = this.props;
    try {
      const response = await bot.respondTo(request);
      addResponseMessage(response);
    } catch (err) {
      console.log("App.handleNewUserMessage:", err);
      addResponseMessage(bot.error());
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
  bot: PropTypes.shape({
    hello: PropTypes.func.isRequired,
    respondTo: PropTypes.func.isRequired,
    error: PropTypes.func.isRequired
  }).isRequired
};

export default App;

const { UserExit } = require("@numical/ubibot-util");

class Bot {
  constructor() {
    this.replyCount = 0;
    this.respondTo = this.respondTo.bind(this);
  }
  async hello() {
    return "Hello.  I'm Echobot";
  }
  async respondTo(request) {
    if (request === "exit") {
      throw new UserExit("Bye!");
    } else {
      this.replyCount++;
      return `${request} (reply #${this.replyCount})`;
    }
  }
}

module.exports = () => new Bot();

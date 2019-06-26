const { UserExit } = require("@numical/ubibot-util");

const defaultState = { replyCount: 0 };

class Bot {
  constructor(state = defaultState) {
    this.replyCount = state.replyCount;
    this.respondTo = this.respondTo.bind(this);
  }
  async hello() {
    return { value: "Hello. I'm Echobot" };
  }
  async respondTo(request) {
    const { value } = request;
    if (value === "exit") {
      throw new UserExit("Bye!");
    } else {
      this.replyCount++;
      return { value: `${value} (reply #${this.replyCount})` };
    }
  }
  async getState() {
    const { replyCount } = this;
    return { replyCount };
  }
}

module.exports = state => new Bot(state);

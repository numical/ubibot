const { UserExit } = require("@numical/ubibot-util");

module.exports = async () => {
  throw new UserExit("Bye!");
};

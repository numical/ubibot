const { Context } = require("@numical/ubibot-engine/");
const { UserExit } = require("@numical/ubibot-util");

const bye = async () => {
  throw new UserExit("Bye!");
};

const exitContext = new Context("Exit");
exitContext.addCommand(["bye", "goodbye", "exit", "quit"], bye);

module.exports = exitContext;

const { UserExit } = require('@numical/ubibot-util');

const hello = async () => "Hello.  I'm Echobot";

const respondTo = async(request) => request === 'exit' ? throw new UserExit('Bye!') : request;

module.exports = () => ({
  hello,
  respondTo
});

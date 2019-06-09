const hello = async () => "Hello.  I'm Echobot";

const respondTo = async request => request;

module.exports = () => ({
  hello,
  respondTo
});

const content = require('../../languages/default.json');
const debug = require('debug')('ubibot:core:api');

const start = () => {
  debug(content['ubibot.core.start']);
  debug(content['ubibot.core.started']);
};

module.exports = {
  start
};

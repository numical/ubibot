// eslint-disable-next-line import/no-unassigned-import
require("./lib/sideEffects");
const constants = require("./lib/constants");
const loadScripts = require("./lib/loadScripts");

module.exports = { constants, loadScripts };

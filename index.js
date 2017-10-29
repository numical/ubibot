// applies 'use strict' pragma all files loaded after this
require('use-strict');

const path = require('path');

// to allow root-relative paths
// explicitly set root so it des not matter if rfr is a peer module
const rfr = require('rfr');
rfr.setRoot(path.join(__dirname, 'lib'));

// the public api
const api = rfr('core/api.js');

module.exports = api;

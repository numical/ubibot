/*
 Start dev-mode Parcel.js server.
 See https://parceljs.org/api.html
 */
const Bundler = require("parcel-bundler");
const path = require("path");
const open = require("open");

(async function() {
  const entryFiles = path.join(__dirname, "./index.html");
  const options = {};
  const bundler = new Bundler(entryFiles, options);

  await bundler.serve();
  open("http://localhost:1234");
})();

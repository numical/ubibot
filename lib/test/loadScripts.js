const fs = require("fs");
const { resolve } = require("path");
const { promisify } = require("util");

const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);

const readFiles = async dir => {
  const files = await readdir(dir);
  const contents = await Promise.all(
    files.map(file => readFile(resolve(dir, file), "utf-8"))
  );
  return files.reduce((scripts, file, index) => {
    scripts[file] = contents[index].split("\n");
    return scripts;
  }, {});
};

const createCache = async dir => {
  cached = await readFiles(dir);
  return cached;
};

const scriptsDir = resolve(__dirname, "./scripts");

const loadScripts = async () => {
  return cached || createCache(scriptsDir);
};

let cached = null;

module.exports = loadScripts;

const { EOL } = require("os");
const fs = require("fs");
const { resolve } = require("path");
const { promisify } = require("util");

const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);

const readFilesContents = async (dir, files, prefix) => {
  const fileContents = await Promise.all(files.map(file => readFile(resolve(dir, file.name), "utf-8")));
  return files.reduce((scripts, file, index) => {
    const key = prefix ? `${prefix}-${file.name}` : file.name;
    scripts[key] = fileContents[index]
      .split(EOL)
      .filter(line => line.length > 0)
      .filter(line => !line.startsWith("#"));
    return scripts;
  }, {});
};

const readDirectoryContents = async (dir, prefix) => {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = entries.filter(entry => entry.isFile());
  const contents = await readFilesContents(dir, files, prefix);
  const subdirs = entries.filter(entry => entry.isDirectory());
  return subdirs.length === 0
    ? contents
    : subdirs.reduce(async (contentsPromise, subdir) => {
        const contents = await contentsPromise;
        const subDirPath = resolve(dir, subdir.name);
        const subDirPrefix = prefix ? `${prefix}-${subdir.name}` : subdir.name;
        const subDirContents = await readDirectoryContents(subDirPath, subDirPrefix);
        return { ...contents, ...subDirContents };
      }, Promise.resolve(contents));
};

const createCache = async dir => {
  cached = await readDirectoryContents(dir);
  return cached;
};

const loadScripts = async path => {
  return cached || createCache(path);
};

let cached = null;

module.exports = loadScripts;

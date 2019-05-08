const { EOL } = require("os");
const fs = require("fs");
const { resolve } = require("path");
const { promisify } = require("util");
const compose = require("ramda/src/compose");

const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);

const checkDirectory = dir => {
  try {
    const stats = fs.statSync(dir);
    if (stats.isDirectory()) {
      return dir;
    } else {
      throw new Error(`scriptsDir '${dir}' must be a directory`);
    }
  } catch (error) {
    switch (error.code) {
      case "ENOENT":
        throw new Error(`scriptsDir '${dir}' must exist`);
      default:
        throw new Error(`accessing scriptsDir '${dir}' throws error ${error}`);
    }
  }
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
        const subDirPrefix = prefix ? `${prefix}/${subdir.name}` : subdir.name;
        const subDirContents = await readDirectoryContents(subDirPath, subDirPrefix);
        return { ...contents, ...subDirContents };
      }, Promise.resolve(contents));
};

const readFilesContents = async (dir, files, prefix) => {
  const fileContents = await Promise.all(files.map(file => readFile(resolve(dir, file.name), "utf-8")));
  return files.reduce((scripts, file, index) => {
    const key = prefix ? `${prefix}/${file.name}` : file.name;
    scripts[key] = fileContents[index]
      .split(EOL)
      .filter(line => line.length > 0)
      .filter(line => !line.startsWith("#"));
    return scripts;
  }, {});
};

const filterForOnlyScripts = async scriptsPromise => {
  const scripts = await scriptsPromise;
  const onlyScripts = Object.entries(scripts).filter(([key, contents]) => contents[0].trim() === "only");
  return onlyScripts.length === 0
    ? scripts
    : onlyScripts.reduce((scripts, [key, contents]) => {
        scripts[key] = contents.slice(1);
        return scripts;
      }, {});
};

const filterForIgnoreScripts = async scriptsPromise => {
  const scripts = await scriptsPromise;
  const unignoredScripts = Object.entries(scripts).filter(([key, contents]) => contents[0].trim() !== "ignore");
  return unignoredScripts.reduce((scripts, [key, contents]) => {
    scripts[key] = contents;
    return scripts;
  }, {});
};

module.exports = compose(
  filterForIgnoreScripts,
  filterForOnlyScripts,
  readDirectoryContents,
  checkDirectory
);

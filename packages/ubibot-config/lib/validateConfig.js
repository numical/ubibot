const { existsSync, statSync } = require("fs");
const Yup = require("yup");

const isFunction = value => typeof value === "function";

const isDir = path => {
  if (!existsSync(path)) {
    throw new Yup.ValidationError(`scriptsDir '${path}' must exist`);
  } else if (!statSync(path).isDirectory()) {
    throw new Yup.ValidationError(`scriptsDir '${path}' must be a directory`);
  } else {
    return true;
  }
};

const schema = Yup.object().shape({
  content: Yup.object().required(),
  start: Yup.mixed()
    .required()
    .test("startIsFunction", "start must be a function", isFunction),
  scriptsDir: Yup.string()
    .required()
    .test("scriptsDirExists", "scriptsDir must exist", isDir)
});

const validateConfig = config => {
  schema.validateSync(config);
};

module.exports = validateConfig;

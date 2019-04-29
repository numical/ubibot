const { existsSync, statSync } = require("fs");
const Yup = require("yup");

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
  contexts: Yup.array().min(1),
  scriptsDir: Yup.string()
    .required()
    .test("scriptsDirExists", "scriptsDir must exist", isDir)
});

const validateConfig = config => {
  schema.validateSync(config);
};

module.exports = validateConfig;

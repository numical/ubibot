const Yup = require("yup");

const schema = Yup.object().shape({
  content: Yup.object().required(),
  contexts: Yup.array().min(1)
});

const validateConfig = config => {
  schema.validateSync(config);
};

module.exports = validateConfig;

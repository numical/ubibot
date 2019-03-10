const generateUID = require("uid-safe");

module.exports = async () => {
  const uid = await generateUID(18);
  return `${Date.now()}-${uid}`;
};

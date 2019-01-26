module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true
  },
  extends: "plugin:prettier/recommended",
  parserOptions: {
    ecmaVersion: 2018
  },
  plugins: ["immutable", "prettier"],
  rules: {
    "prettier/prettier": "error"
  }
};

module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true
  },
  extends: ["standard", "plugin:prettier/recommended"],
  parserOptions: {
    ecmaVersion: 2018
  },
  plugins: ["prettier", "const-immutable"],
  rules: {
    "prettier/prettier": [
      "error",
      {
        printWidth: 120
      }
    ],
    "const-immutable/no-mutation": 2
  }
};

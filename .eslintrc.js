module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true
  },
  extends: ["standard", "plugin:prettier/recommended", "plugin:react/recommended"],

  parserOptions: {
    ecmaVersion: 2018
  },
  plugins: ["prettier", "const-immutable", "react"],
  rules: {
    "prettier/prettier": [
      "error",
      {
        printWidth: 120
      }
    ],
    "const-immutable/no-mutation": 2,
    "no-unused-vars": ["error", { varsIgnorePattern: "React" }]
  }
};

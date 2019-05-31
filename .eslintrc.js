module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true
  },
  extends: ["standard", "plugin:prettier/recommended", "plugin:react/recommended"],
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 2018,
    ecmaFeatures: "impliedStrict"
  },
  plugins: ["prettier", "const-immutable", "react", "import"],
  rules: {
    "prettier/prettier": [
      "error",
      {
        printWidth: 120
      }
    ],
    "const-immutable/no-mutation": 2,
    "no-unused-vars": ["error", { varsIgnorePattern: "React" }],
    "import/no-unresolved": 2,
    "import/named": 2,
    "import/default": 2,
    "import/namespace": 2,
    "import/no-restricted-paths": 2,
    "import/no-absolute-path": 2,
    "import/no-dynamic-require": 2,
    "import/no-internal-modules": 0,
    "import/no-webpack-loader-syntax": 2,
    "import/no-self-import": 2,
    "import/no-cycle": 2,
    "import/no-useless-path-segments": 2,
    "import/no-relative-parent-imports": 2,
    "import/no-unused-modules": 2,
    "import/export": 2,
    "import/no-named-as-default": 2,
    "import/no-named-as-default-member": 2,
    "import/no-deprecated": 2,
    "import/no-extraneous-dependencies": 2,
    "import/no-mutable-exports": 2,
    "import/no-unused-modules": 2,
    "import/unambiguous": 0,
    "import/no-commonjs": 0,
    "import/no-amd": 2,
    "import/no-nodejs-modules": 0,
    "import/first": 2,
    "import/exports-last": 2,
    "import/no-duplicates": 2,
    "import/no-namespace": 2,
    "import/extensions": 2,
    "import/order": 2,
    "import/newline-after-import": 2,
    "import/prefer-default-export": 2,
    "import/max-dependencies": 2,
    "import/no-unassigned-import": ["error", { allow: ["**/*.css"] }],
    "import/no-named-default": 2,
    "import/no-default-export": 0,
    "import/no-named-export": 2,
    "import/no-anonymous-default-export": 2,
    "import/group-exports": 2,
    "import/dynamic-import-chunkname": 2
  },
  settings: {
    react: {
      version: "detect"
    }
  }
};

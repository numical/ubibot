module.exports = {
  presets: [
    "@babel/preset-react",
    [
      "@babel/preset-env",
      {
        useBuiltIns: "entry",
        corejs: 3,
        exclude: ["transform-classes"]
      }
    ]
  ],
  plugins: ["@babel/plugin-syntax-dynamic-import"]
};

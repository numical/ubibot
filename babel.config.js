module.exports = {
  presets: [
    "@babel/preset-react",
    [
      "@babel/preset-env",
      {
        useBuiltIns: "entry",
        corejs: 3,
        exclude: ["transform-engine"]
      }
    ]
  ],
  plugins: ["@babel/plugin-syntax-dynamic-import"]
};

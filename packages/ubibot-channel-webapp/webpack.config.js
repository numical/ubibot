const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const isProduction = process.env.NODE_NV === "production";

module.exports = {
  mode: isProduction ? "production" : "development",
  target: "web",
  devtool: "source-map",
  entry: {
    ubibot: "./lib/index.js"
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js"
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./index.html"
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
        exclude: /node_modules(?!\/react-chat-widget)/
      }
    ]
  }
};

const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { DefinePlugin } = require("webpack");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const isProduction = process.env.NODE_ENV === "production";

const outputPath = process.env.UBIBOT_DESTINATION || path.resolve(__dirname, "dist");

const analyzerOptions = {
  analyzerMode: isProduction ? "static" : "disabled"
};

module.exports = {
  mode: isProduction ? "production" : "development",
  target: "web",
  devtool: "source-map",
  entry: {
    ubibot: "./index.js"
  },
  output: {
    path: outputPath,
    filename: "[name].js"
  },
  plugins: [
    new DefinePlugin({
      UBIBOT_SOURCE: `"${process.env.UBIBOT_SOURCE}"`
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./index.html"
    }),
    new BundleAnalyzerPlugin(analyzerOptions)
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          rootMode: "upward"
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
        exclude: /node_modules(?!\/react-chat-widget)/
      }
    ]
  }
};

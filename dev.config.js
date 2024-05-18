const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const { baseConfig } = require("./base.config.js");
const devConfig = baseConfig;
devConfig.mode = "development";
devConfig.devServer = {
  hot: true,
  static: "./dist",
};
devConfig.watchOptions = {
  aggregateTimeout: 200,
  poll: 1000,
};
devConfig.optimization = {
    useExports: true
}
module.exports = {
  devConfig,
};
const webpack = require("webpack");
const { baseConfig } = require("./base.config.js");

const prodConfig = baseConfig;
prodConfig.mode = "production";
prodConfig.optimization = {
  chunkIds: "total-size",
  moduleIds: 'deterministic',
  
};
prodConfig.plugins.push(
  new webpack.ids.DeterministicChunkIdsPlugin({
    maxLenght: 5,
  })
);

module.exports = {
  prodConfig,
};
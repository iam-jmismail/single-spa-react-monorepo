const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react-ts");
const path = require("path");
const webpack = require("webpack");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "sspa-poc",
    projectName: "admin",
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    mode: "development",
    output: {
      path: path.resolve(__dirname, "../../.dist/admin"),
      publicPath: "/",
      chunkFormat: "array-push",
    },
    plugins: [new webpack.HotModuleReplacementPlugin()],
  });
};

const { DefinePlugin } = require("webpack");
const { config } = require("dotenv");

module.exports = {
  mainSrcDir: "main",
  rendererSrcDir: "renderer",

  // main process' webpack config
  webpack: (defaultConfig, env) => {
    return Object.assign(defaultConfig, {
      plugins: [new DefinePlugin({ "process.env": JSON.stringify(config("../.env").parsed) })],
    });
  },
};

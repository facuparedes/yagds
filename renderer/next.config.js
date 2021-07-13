const withBundleAnalyzer = require("@next/bundle-analyzer")({ enabled: process.env.ANALYZE === "true" });

module.exports = withBundleAnalyzer({
  webpack: (config, { isServer }) => {
    if (isServer) return config;
    return Object.assign(config, {
      target: "electron-renderer",
      node: { global: false, __filename: false, __dirname: true },
    });
  },
});

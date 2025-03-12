import type { NextConfig } from "next";
// const CopyPlugin = require("copy-webpack-plugin");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  webpack: (config, options) => {
    config.experiments = {
      asyncWebAssembly: true, //Enable WebAssembly
      syncWebAssembly: true, //Enable WebAssembly (deprecated)
      layers: true, // Fixes 'entryOptions.layer' error
    };

    config.module.rules.push({
      test: /\.wasm$/,
      type: "webassembly/async",
    });
    // config.plugins.push(
    //   new CopyPlugin({
    //     patterns: [{ from: "public/wasm", to: "./static/wasm" }],
    //   })
    // );
    return config;
  },
};

export default nextConfig;

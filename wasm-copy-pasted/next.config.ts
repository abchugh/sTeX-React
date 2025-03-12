import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  reactStrictMode: true,
  webpack: (config, options) => {
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
      topLevelAwait: true,
    };
    config.optimization.moduleIds = "named";

    // https://github.com/vercel/next.js/issues/25852
    if (options.isServer) {
      config.output.webassemblyModuleFilename =
        "./../static/wasm/3daefa5fdc3457b0.wasm";
    } else {
      config.output.webassemblyModuleFilename = "static/wasm/3daefa5fdc3457b0.wasm";
    }

    return config;
  },
};

export default nextConfig;

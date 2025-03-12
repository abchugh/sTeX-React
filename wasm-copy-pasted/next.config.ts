import type { NextConfig } from "next";

function patchWasmModuleImport(config: any, isServer: any) {
  config.experiments = Object.assign(config.experiments || {}, {
    asyncWebAssembly: true,
  });

  config.optimization.moduleIds = "named";

  config.module.rules.push({
    test: /\.wasm$/,
    type: "webassembly/async",
  });

  // TODO: improve this function -> track https://github.com/vercel/next.js/issues/25852
  if (isServer) {
    config.output.webassemblyModuleFilename =
      "./../static/wasm/3daefa5fdc3457b0.wasm";
  } else {
    config.output.webassemblyModuleFilename = "static/wasm/3daefa5fdc3457b0.wasm";
  }
}

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
    patchWasmModuleImport(config, options.isServer);
    return config;
  },
};

export default nextConfig;

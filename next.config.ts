import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  // webpack: (config, { isServer }) => {
  //   if (isServer) {
  //     // não bundle o addon nativo; deixa para o require em runtime
  //     config.externals = config.externals || [];
  //     config.externals.push("@shaayud/sdk-core");

  //     // garante que o resolver considere a export condition "node"
  //     config.resolve = config.resolve || {};
  //     config.resolve.conditionNames = [
  //       ...(config.resolve.conditionNames || []),
  //       "node",
  //     ];
  //   }
  //   return config;
  // },
};

export default nextConfig;

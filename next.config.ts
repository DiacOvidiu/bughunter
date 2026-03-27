import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactCompiler: true,
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "bughunter.ro" }],
        destination: "https://www.bughunter.ro/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

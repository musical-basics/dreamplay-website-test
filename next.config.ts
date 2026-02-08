import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/checkout-pages/customize',
        destination: '/customize',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

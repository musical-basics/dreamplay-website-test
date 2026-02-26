import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/checkout-pages/customize',
        destination: '/customize',
        permanent: true,
      },
      {
        source: '/shipping',
        destination: '/information-and-policies/shipping',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

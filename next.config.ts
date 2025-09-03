import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  poweredByHeader: false,
  output: 'standalone',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [new URL('https://d2r32amryjykij.cloudfront.net/**')],
  },
};

export default nextConfig;

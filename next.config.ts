import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    qualities: [10, 50, 75, 100],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.discordapp.net',
      },
      {
        protocol: 'https',
        hostname: '*.discordapp.com',
      },
      {
        protocol: 'https',
        hostname: '*.dstn.to',
      },
    ],
  },
};

export default nextConfig;

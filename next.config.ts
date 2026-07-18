import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
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

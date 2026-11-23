import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // A server of its own, with only the files it needs, for the Docker image
  output: 'standalone',
  reactCompiler: true,
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    qualities: [10, 50, 75, 100],
    remotePatterns: [
      // The gallery's photos, in Garage's cute bucket
      {
        protocol: 'https',
        hostname: 'images.niso.moe',
        pathname: '/cute/**',
      },
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

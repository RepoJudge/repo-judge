/* eslint-disable no-restricted-properties */
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  reactCompiler: {
    compilationMode: 'infer',
    panicThreshold: 'none',
  },
  productionBrowserSourceMaps: true,
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [70],
    dangerouslyAllowLocalIP: true,
    remotePatterns: [
      {
        hostname: '**',
      },
    ],
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push('canvas');
    }
    return config;
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

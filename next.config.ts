import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'alwalaaoman.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'jribpfntcosbyntbyvsg.supabase.co',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'hpxaaiaoasgoazpgilht.supabase.co',
        pathname: '/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/properties',
        destination: '/property-search',
        permanent: true,
      },
      {
        source: '/properties/:slug',
        destination: '/property-search/:slug',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

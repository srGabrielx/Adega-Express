/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/index.html',
        destination: '/',
        permanent: true,
      },
      {
        source: '/index',
        destination: '/',
        permanent: true,
      },
      {
        source: '/checkout.html',
        destination: '/checkout',
        permanent: true,
      },
      {
        source: '/history.html',
        destination: '/history',
        permanent: true,
      },
      {
        source: '/order-success.html',
        destination: '/checkout/success',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;

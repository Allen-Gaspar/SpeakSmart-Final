/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static file serving from /public directory
  publicRuntimeConfig: {
    staticFolder: '/public',
  },
  
  // Allow static HTML files to be served directly
  experimental: {
    staticGenerationRetryCount: 5,
  },

  // Allow dev origins for HMR
  allowedDevOrigins: [
    'vm-84f7wlxgkhlxnxux7ublwxt2.vusercontent.net',
    'localhost:3000',
    '127.0.0.1:3000',
  ],

  // Rewrite static HTML files
  async rewrites() {
    return [
      {
        source: '/:path((?!api|_next|images|styles|js|.*\\..*).+).html',
        destination: '/public/:path.html',
      },
    ];
  },
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Server external packages
  serverExternalPackages: ['@dfinity/agent', '@dfinity/auth-client'],
  
  // Image optimization configuration
  images: {
    domains: ['localhost'],
    formats: ['image/webp', 'image/avif'],
  },
  
  // Webpack configuration for ICP dependencies
  webpack: (config, { isServer }) => {
    // Handle ICP dependencies that might have issues with webpack
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };
    
    // Handle ES modules
    config.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: 'javascript/auto',
    });
    
    return config;
  },
  
  // Environment variables
  env: {
    CUSTOM_KEY: 'petrax-oil-trading',
  },
  
  // Headers for security
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
  
  // Redirects
  async redirects() {
    return [
      {
        source: '/market-place',
        destination: '/marketplace',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;

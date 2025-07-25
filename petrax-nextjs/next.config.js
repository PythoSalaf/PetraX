/** @type {import('next').NextConfig} */
const nextConfig = {
  // Server external packages
  serverExternalPackages: ['@dfinity/agent', '@dfinity/auth-client'],

  // Image optimization configuration
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'localhost',
        pathname: '/**',
      },
    ],
    formats: ['image/webp', 'image/avif'],
  },

  // Webpack configuration for ICP dependencies
  // Note: Custom webpack config is required for ICP blockchain integration
  // Turbopack support will be added when @dfinity packages are fully compatible
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

  // Experimental Turbopack configuration (for future use)
  experimental: {
    // Enable when @dfinity packages support Turbopack
    // turbo: {
    //   rules: {
    //     '*.mjs': {
    //       loaders: ['@turbo/loader-mjs'],
    //       as: '*.js',
    //     },
    //   },
    // },
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

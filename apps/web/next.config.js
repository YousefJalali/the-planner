// eslint-disable-next-line @typescript-eslint/no-var-requires
const withNx = require('@nx/next/plugins/with-nx')
const path = require('path')

/**
 * @type {import('next').NextConfig}
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  reactStrictMode: true,

  compiler: {
    styledComponents: true,
  },

  images: {
    domains: ['res.cloudinary.com', 'placeimg.com', 'cdn.fakercloud.com'],
  },

  webpack(config, { isServer }) {
    if (!isServer) {
      config.resolve.fallback.fs = false
    }

    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    })

    // config.resolve.fallback = {
    //   ...(!isServer && { fs: false }),
    //   tls: false,
    //   net: false,
    // }

    return config
  },

  nx: {
    // Set this to true if you would like to to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  experimental: {
    outputFileTracingRoot: path.join(__dirname, '../../'),
    outputFileTracingExcludes: {
      '*': [
        // prettier-ignore
        'node_modules/@swc/core-linux-x64-gnu',
        'node_modules/@swc/core-linux-x64-musl',
        'node_modules/@esbuild/linux-x64',
      ],
    },
  },
}

module.exports = withNx(nextConfig)

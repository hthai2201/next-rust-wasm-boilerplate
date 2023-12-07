// @ts-nocheck
const WasmPackPlugin = require('@wasm-tool/wasm-pack-plugin')
const path = require('path')

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

require('dotenv').config()

/**
 * @type {import('next').NextConfig}
 **/
module.exports = withBundleAnalyzer({
  env: {
    BASE_URL: process.env.BASE_URL,
  },

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    })
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
      layers: true,
    }
    config.plugins.push(
      new WasmPackPlugin({
        crateDirectory: path.resolve(__dirname, 'wasm'),
        outDir: path.resolve(__dirname, 'wasm/pkg'),
      }),
    )

    return config
  },
})

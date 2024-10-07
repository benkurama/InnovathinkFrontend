/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.pokemondb.net',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'innovathinkdirectusapi.onrender.com',
        port: '',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8055',
        pathname: '**',
      }
    ],
  },
}

module.exports = nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/',
        has: [
          {
            type: 'host',
            value: 'www.lynkdigital.co.in',
          },
        ],
        destination: 'https://lynkdigital.co.in',
        permanent: true,
      },
    ]
  },
}

export default nextConfig

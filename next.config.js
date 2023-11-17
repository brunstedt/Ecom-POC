/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'repository-images.githubusercontent.com',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'www.scandichotels.se',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'd3p3oepuk3k14u.cloudfront.net',
                pathname: '/**',
            },
        ],
    },
}

module.exports = nextConfig

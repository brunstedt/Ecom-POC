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
            }
        ]
    }
}

module.exports = nextConfig

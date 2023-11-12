/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'repository-images.githubusercontent.com',
                pathname: '/**',
            }
        ]
    }
}

module.exports = nextConfig

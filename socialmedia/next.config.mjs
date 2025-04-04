/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        domains: ['20.244.56.144'],
    },
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'http://20.244.56.144/evaluation-service/:path*',
            },
        ];
    },
};

export default nextConfig;

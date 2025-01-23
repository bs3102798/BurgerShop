/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns:[
            {
                protocol:"https",
                hostname: 'lh3.googleusercontent.com',
                // port: '',
                // pathname: '/account123/**',
            },
            {
                protocol: 'https',
                hostname:'burger-shop.s3.amazonaws.com',

            },
        ]
    }
};

export default nextConfig;

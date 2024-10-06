/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        ignoreBuildErrors: true,
    },
    images: {
        loader: "akamai",
        path: "/",
    },
};

export default nextConfig;

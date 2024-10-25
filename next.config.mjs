/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "m.media-amazon.com",
      },
      {
        hostname: "files.edgestore.dev",
      },
    ],
  },
};

export default nextConfig;

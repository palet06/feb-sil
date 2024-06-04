/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "febsigorta.com.tr",
        port: "3000",
        pathname: "/assets/**",
      },
    ],
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.hachettebookgroup.com",
      },
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
      },
      {
        protocol: "https",
        hostname: "*.litres.ru",
      },
      {
        protocol: "https",
        hostname: "*.ozone.ru",
      },
      {
        protocol: "https",
        hostname: "*.litres.com",
      },
    ],
  },
};

export default nextConfig;

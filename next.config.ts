import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: [
    'http://192.168.88.10:3000', // ton IP et port
    'http://localhost:3000'      // toujours utile de garder localhost
  ],
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow larger body size for file uploads (10MB)
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
};

export default nextConfig;

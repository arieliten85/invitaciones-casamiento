import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Fotos de stock libre de la demo (Pexels). Las fotos reales van en public/brand/photos.
    remotePatterns: [
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;

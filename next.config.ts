import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Fotos de ejemplo de la demo. Las fotos reales van en public/brand/photos.
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
};

export default nextConfig;

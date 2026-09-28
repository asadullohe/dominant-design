import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  images: {
    // Next 16 requires every quality used by <Image> to be listed.
    qualities: [75, 85],
    formats: ["image/avif", "image/webp"],
  },
};

export default createNextIntlPlugin()(nextConfig);

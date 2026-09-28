import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  experimental: {
    // Turbopack's build cache snapshots environment values, which put TELEGRAM_BOT_TOKEN into
    // .next/cache and failed Netlify's secret scan. Netlify builds start clean anyway, so the cache buys nothing.
    turbopackFileSystemCacheForBuild: false,
  },
  images: {
    // Next 16 requires every quality used by <Image> to be listed.
    qualities: [75, 85],
    formats: ["image/avif", "image/webp"],
  },
};

export default createNextIntlPlugin()(nextConfig);

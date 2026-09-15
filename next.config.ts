import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Serve the checked-in brand and portfolio assets directly. The Sites image
  // proxy is not required for these already-optimised files and can leave
  // broken placeholders when its image binding is unavailable.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

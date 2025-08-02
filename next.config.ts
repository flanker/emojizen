import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // GitHub Pages uses Jekyll by default which ignores files starting with _
  // This adds a .nojekyll file to disable Jekyll
  assetPrefix: process.env.NODE_ENV === 'production' ? '/emojizen' : '',
  basePath: process.env.NODE_ENV === 'production' ? '/emojizen' : '',
};

export default nextConfig;

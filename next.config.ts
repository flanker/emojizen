import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // 自定义域名不需要basePath，只有在使用 username.github.io/repository-name 时才需要
  // 如果使用自定义域名，请注释掉下面两行
  // assetPrefix: process.env.NODE_ENV === 'production' ? '/emojizen' : '',
  // basePath: process.env.NODE_ENV === 'production' ? '/emojizen' : '',
};

export default nextConfig;

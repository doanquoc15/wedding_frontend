/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "www.escoffier.edu",
      "nguoinoitieng.tv",
      "image2.tin247.news",
      "cdn.sgtiepthi.vn",
      "www.pngkey.com",
      "lavenderstudio.com.vn"
    ], // <== Domain name link image
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;

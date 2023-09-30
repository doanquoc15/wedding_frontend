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
    ], // <== Domain name link image
  },
};

module.exports = nextConfig;

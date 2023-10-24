/** @type {import('next').NextConfig} */
const nextConfig = {
  //pageExtensions: ["ts", "tsx"],
  reactStrictMode: true,
  images: {
    domains: [
      "www.escoffier.edu",
      "nguoinoitieng.tv",
      "image2.tin247.news",
      "cdn.sgtiepthi.vn",
      "www.pngkey.com",
      "lavenderstudio.com.vn",
      "img.freepik.com",
      "haycafe.vn",
      "cdn4.vectorstock.com",
      "xuconcept.com",
      "sdl.thuathienhue.gov.vn"
    ], // <== Domain name link image
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "truyentranhlh.net",
        port: "",
      },
      {
        protocol: "https",
        hostname: "cdn1.lhmanga.com",
        port: "",
      },
      {
        protocol: "http",
        hostname: "cdn4.lhmanga.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "cdn4.lhmanga.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "3.bp.blogspot.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "1.bp.blogspot.com",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;

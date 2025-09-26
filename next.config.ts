import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.freepik.com",
      },
      {
        protocol: "https",
        hostname: "www.shutterstock.com",
      },
      {
        protocol: "https",
        hostname: "randomuser.me",
      },
      {
        protocol: "https",
        hostname: "api.www.nishchalluitel.com",
      },
      {
        protocol: "http",
        hostname: "api.www.nishchalluitel.com",
      },
      {
        protocol: "https",
        hostname: "cdn-icons-png.flaticon.com",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "fastly.picsum.photos",
      },
      {
        protocol: "https",
        hostname: "unsplash.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "static.vecteezy.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "http",
        hostname: "developapi.ultrabeautybrands.com",
      },
      {
        protocol: "https",
        hostname: "developapi.ultrabeautybrands.com",
      },
      {
        protocol: "https",
        hostname: "api.ultrabeautybrands.com",
      }
      ,
      {
        protocol: "http",
        hostname: "api.ultrabeautybrands.com",
      },
      {
        protocol: "https",
        hostname: "ultrabeauty.blr1.digitaloceanspaces.com",
      }
    ],
  },
};

export default nextConfig;

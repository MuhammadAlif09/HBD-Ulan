import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export → hasil build di folder `out/` bisa di-deploy ke hosting statis apa pun
  // (GitHub → Google AI Studio, Vercel, Netlify, dst). Lihat skills/deployment-assets.md.
  output: "export",
  images: {
    // next/image optimizer butuh server; untuk static export pakai unoptimized.
    unoptimized: true,
  },
  reactCompiler: true,
  trailingSlash: true,
};

export default nextConfig;

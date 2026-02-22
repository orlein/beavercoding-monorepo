import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [
    "@beavercoding/supabase",
    "@beavercoding/effect-infra",
    "@beavercoding/ddd-content",
  ],
};

export default nextConfig;

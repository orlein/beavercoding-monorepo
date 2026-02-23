import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [
    "@beavercoding/supabase",
    "@beavercoding/effect-infra",
    "@beavercoding/ddd-content",
    "@beavercoding/ui",
  ],
};

export default nextConfig;

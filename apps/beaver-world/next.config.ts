import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	transpilePackages: ["@beavercoding/supabase", "@beavercoding/ui"],
};

export default nextConfig;

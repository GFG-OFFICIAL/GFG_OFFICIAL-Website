import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  // Required for static HTML export on GitHub pages
  output: 'export', 
  
  // Must match your GitHub repository name exactly
  basePath: isProd ? "/GFG_OFFICIAL-Website" : "",
  
  // Ensures paths resolve cleanly
  trailingSlash: true,
  
  images: {
    unoptimized: true,
  },
  
  env: {
    NEXT_PUBLIC_BASE_PATH: isProd ? "/GFG_OFFICIAL-Website" : "",
  },
};

export default nextConfig;
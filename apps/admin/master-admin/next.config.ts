import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@core/bc-ui'],
  serverExternalPackages: ['graffle', '@wollybeard/kit', 'graphql'],
};
export default nextConfig;

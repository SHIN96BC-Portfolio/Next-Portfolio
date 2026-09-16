import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@core/bc-ui'],
  reactStrictMode: false,
  // 사내 TLS/프록시 환경에서 next/font Google Fonts fetch 실패 완화
  experimental: {
    turbopackUseSystemTlsCerts: true,
  },
  async headers() {
    return [
      {
        // public/mockServiceWorker.js 파일에만 캐시 금지 헤더 추가
        source: '/mockServiceWorker.js',
        headers: [
          { key: 'Cache-Control', value: 'no-store, no-cache, must-revalidate, proxy-revalidate' },
          { key: 'Pragma', value: 'no-cache' },
          { key: 'Expires', value: '0' },
        ],
      },
    ];
  },
};

export default nextConfig;

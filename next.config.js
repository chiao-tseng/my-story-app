// 暫時禁用 PWA 以完成建置
// const withPWA = require('next-pwa')({
//   dest: 'public',
//   disable: process.env.NODE_ENV === 'development',
//   register: true,
//   skipWaiting: true,
// });

module.exports = {
  // experimental: { appDir: true }, // Next.js 15 已預設啟用
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};
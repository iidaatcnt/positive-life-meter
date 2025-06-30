/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // ビルド時のESLintを無効化
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig
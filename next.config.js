/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removed 'output: export' to enable API routes for leaderboard
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    // Keeps Next.js from writing its build cache, which can record the values
    // of environment variables (such as secrets) into files Netlify scans.
    turbopackFileSystemCacheForBuild: false,
  },
}

export default nextConfig

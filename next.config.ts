import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Pin the workspace root — a stray lockfile in a parent directory otherwise
  // makes Next.js infer the wrong root.
  turbopack: {
    root: __dirname,
  },
}

export default nextConfig

// Makes Cloudflare bindings/env available when running `next dev`, so the app
// behaves the same locally as it does on Workers. No-op in production builds.
import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare'
void initOpenNextCloudflareForDev()

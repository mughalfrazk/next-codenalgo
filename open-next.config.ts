import { defineCloudflareConfig } from '@opennextjs/cloudflare'

// Default OpenNext + Cloudflare configuration. This is enough for a mostly
// static site with a single server action; add an incremental cache (R2/KV)
// here later if the app grows heavier server-rendered surfaces.
export default defineCloudflareConfig()

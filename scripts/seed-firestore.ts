/**
 * One-off seed: copies src/content/site.ts into Firestore so the admin panel's
 * starting state matches the live site. Run manually with:
 *   yarn tsx scripts/seed-firestore.ts
 * Requires NEXT_PUBLIC_FIREBASE_* env vars to be set (see .env.example).
 */
import { getDefaultSiteSettings, saveSiteSettings } from '../src/data/siteSettings'

async function main() {
  const settings = getDefaultSiteSettings()
  await saveSiteSettings(settings)
  console.log('Seeded siteSettings with:', settings)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

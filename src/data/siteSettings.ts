import { doc, getDoc, setDoc } from 'firebase/firestore/lite'
import { getFirebaseDb, isFirebaseConfigured } from '@/lib/firebase/client'
import { SITE_SETTINGS_DOC_ID, type SiteSettings, siteSettingsSchema } from '@/models/siteSettings'
import { site, socials } from '@/content/site'

const COLLECTION = 'siteSettings'

/** Static content file acts as the offline/first-run fallback. */
export function getDefaultSiteSettings(): SiteSettings {
  return { ...site, socials: [...socials] }
}

export async function fetchSiteSettings(): Promise<SiteSettings> {
  if (!isFirebaseConfigured()) return getDefaultSiteSettings()

  const ref = doc(getFirebaseDb(), COLLECTION, SITE_SETTINGS_DOC_ID)
  const snap = await getDoc(ref)
  if (!snap.exists()) return getDefaultSiteSettings()

  const parsed = siteSettingsSchema.safeParse(snap.data())
  return parsed.success ? parsed.data : getDefaultSiteSettings()
}

export async function saveSiteSettings(input: SiteSettings): Promise<void> {
  const validated = siteSettingsSchema.parse({ ...input, updatedAt: Date.now() })
  const ref = doc(getFirebaseDb(), COLLECTION, SITE_SETTINGS_DOC_ID)
  await setDoc(ref, validated)
}

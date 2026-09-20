/**
 * CLI wrapper for lib/scenarios.ts::bypassConsentCases. See loadtest.ipynb
 * for the interactive version.
 *
 * Usage:
 *   deno run --allow-net --allow-env loadtest/scenarios/04-bypass-consent.ts --yes
 */
import { TARGET_URL, CONTACT_PATH, assertSafeTarget, confirmOrExit } from '../config.ts'
import { bypassConsentCases } from '../lib/scenarios.ts'

const yes = Deno.args.includes('--yes')
const pageUrl = new URL(CONTACT_PATH, TARGET_URL).toString()

assertSafeTarget(TARGET_URL)
confirmOrExit(
  `This submits directly to ${pageUrl} with no consent, an invalid email, and a too-short ` +
    `"details" field — all things the client blocks. Expect (and verify in Firestore) a rejection.`,
  yes
)

const results = await bypassConsentCases(pageUrl)
for (const [label, result] of Object.entries(results)) {
  console.log(`[${label}] status=${result.status}`)
  console.log('  body snippet:', result.bodySnippet.replace(/\n/g, ' '))
}

console.log(
  '\nStatus 200 here does NOT mean success — Server Action posts always return 200. Check Firestore ' +
    '`contactSubmissions` for whether any of these actually created a doc.'
)

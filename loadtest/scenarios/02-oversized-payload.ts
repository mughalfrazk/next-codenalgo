/**
 * CLI wrapper for lib/scenarios.ts::oversizedPayload. See loadtest.ipynb for
 * the interactive version.
 *
 * Usage:
 *   deno run --allow-net --allow-env loadtest/scenarios/02-oversized-payload.ts --yes
 *   deno run --allow-net --allow-env loadtest/scenarios/02-oversized-payload.ts --yes --sizeKb=5000
 */
import { TARGET_URL, CONTACT_PATH, assertSafeTarget, confirmOrExit } from '../config.ts'
import { oversizedPayload } from '../lib/scenarios.ts'

const args = Deno.args
const sizeKbArg = args.find((a) => a.startsWith('--sizeKb='))
const sizeKb = sizeKbArg ? Number(sizeKbArg.split('=')[1]) : 1024
const yes = args.includes('--yes')

const pageUrl = new URL(CONTACT_PATH, TARGET_URL).toString()

assertSafeTarget(TARGET_URL)
confirmOrExit(
  `This will submit ONE contact-form entry with a ~${sizeKb}KB "details" field to ${pageUrl}. ` +
    `If accepted, it writes an oversized doc to Firestore and emails an oversized message via Resend.`,
  yes
)

const result = await oversizedPayload(pageUrl, sizeKb)

console.log(`status=${result.status} elapsed=${result.elapsedMs.toFixed(0)}ms`)
console.log('body snippet:', result.bodySnippet)
console.log(
  '\nHTTP status does not confirm success/failure for Server Action posts — check the Firestore ' +
    '`contactSubmissions` collection for whether an oversized doc actually landed.'
)

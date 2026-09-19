/**
 * CLI wrapper for lib/scenarios.ts::concurrentRace. See loadtest.ipynb for
 * the interactive version.
 *
 * Usage:
 *   deno run --allow-net --allow-env loadtest/scenarios/03-concurrent-race.ts --count=20 --yes
 */
import { TARGET_URL, CONTACT_PATH, assertSafeTarget, parseArgs, confirmOrExit } from '../config.ts'
import { concurrentRace } from '../lib/scenarios.ts'

const { count, yes } = parseArgs(Deno.args)
const pageUrl = new URL(CONTACT_PATH, TARGET_URL).toString()

assertSafeTarget(TARGET_URL)
confirmOrExit(
  `This will fire ${count} contact-form submissions ALL AT ONCE (no throttling) at ${pageUrl}, ` +
    `specifically to trigger Resend's 3 req/sec rate limit and check the rollback logic.`,
  yes
)

const started = performance.now()
const statuses = await concurrentRace(pageUrl, count)
const elapsed = performance.now() - started

console.log(`Fired ${count} requests concurrently in ${elapsed.toFixed(0)}ms`)
console.log('statuses:', statuses)
console.log(
  '\nNow check Firestore console -> contactSubmissions for any doc with emailStatus == "pending" ' +
    'that never resolved to "sent" or got deleted. That indicates the rollback logic has a gap ' +
    'under concurrent load.'
)

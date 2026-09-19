/**
 * CLI wrapper for lib/scenarios.ts::floodContact. See loadtest.ipynb for the
 * interactive, cell-by-cell version of the same logic.
 *
 * Usage:
 *   deno run --allow-net --allow-env loadtest/scenarios/01-flood-contact.ts --count=10 --concurrency=5 --yes
 */
import { TARGET_URL, CONTACT_PATH, assertSafeTarget, parseArgs, confirmOrExit } from '../config.ts'
import { floodContact } from '../lib/scenarios.ts'

const { count, concurrency, yes } = parseArgs(Deno.args)
const pageUrl = new URL(CONTACT_PATH, TARGET_URL).toString()

assertSafeTarget(TARGET_URL)
confirmOrExit(
  `This will submit ${count} real contact-form entries (concurrency ${concurrency}) to ${pageUrl}.\n` +
    `Each success writes a Firestore doc and sends a real email via Resend — this WILL count ` +
    `against your daily Resend/Firestore quota.`,
  yes
)

const summary = await floodContact(pageUrl, count, concurrency)

console.log('statuses:', summary.statuses)
console.log('\n--- Summary ---')
console.log(`total=${summary.count} succeeded=${summary.succeeded} failed=${summary.failed}`)
console.log(`p50=${summary.p50.toFixed(0)}ms p95=${summary.p95.toFixed(0)}ms`)
console.log(
  summary.succeeded === summary.count
    ? '\nEvery submission went through — nothing today stops this. Check Firestore/Resend dashboards for the new junk entries.'
    : '\nSome submissions were rejected — something (rate limit? quota?) is already pushing back.'
)

/**
 * CLI wrapper for lib/scenarios.ts::staticPageFlood. See loadtest.ipynb for
 * the interactive version.
 *
 * Usage:
 *   deno run --allow-net --allow-env loadtest/scenarios/05-static-page-flood.ts --count=200 --concurrency=20 --yes
 */
import { TARGET_URL, assertSafeTarget, parseArgs, confirmOrExit } from '../config.ts'
import { staticPageFlood } from '../lib/scenarios.ts'

const { count, concurrency, yes } = parseArgs(Deno.args)
const paths = ['/', '/services', '/contact', '/about']

assertSafeTarget(TARGET_URL)
confirmOrExit(
  `This will fire ${count} requests (concurrency ${concurrency}) at static pages under ${TARGET_URL}. ` +
    `No writes/emails involved — worst case is Cloudflare throttling you.`,
  yes
)

const summary = await staticPageFlood(TARGET_URL, paths, count, concurrency)

console.log('\n--- Summary ---')
console.log(`total=${summary.count} wallClock=${summary.wallClockMs.toFixed(0)}ms`)
console.log('status counts:', summary.statusCounts)
console.log(
  `p50=${summary.p50.toFixed(0)}ms p95=${summary.p95.toFixed(0)}ms p99=${summary.p99.toFixed(0)}ms`
)

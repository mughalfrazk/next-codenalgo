/**
 * The actual break-it logic, as plain functions with explicit params —
 * shared by the CLI scripts in scenarios/*.ts and by loadtest.ipynb.
 * Nothing here reads Deno.args or env; callers decide where params come
 * from.
 */
import { submitContactForm, randomEmail, type SubmitResult } from './contactForm.ts'

export type FloodSummary = {
  count: number
  succeeded: number
  failed: number
  p50: number
  p95: number
  statuses: (number | 'error')[]
}

function percentile(sorted: number[], p: number): number {
  return sorted[Math.floor(sorted.length * p)] ?? 0
}

/** Scenario 1: flood the contact form like a spam bot would. */
export async function floodContact(
  pageUrl: string,
  count: number,
  concurrency: number
): Promise<FloodSummary> {
  const durations: number[] = []
  const statuses: (number | 'error')[] = []
  let succeeded = 0
  let failed = 0

  const queue = Array.from({ length: count }, (_, i) => i + 1)
  const workers = Array.from({ length: concurrency }, async () => {
    while (queue.length > 0) {
      const i = queue.shift()
      if (i === undefined) break
      try {
        const result = await submitContactForm(pageUrl, {
          name: `Loadtest Bot ${i}`,
          email: randomEmail(),
          details: `Automated load-test submission #${i} sent at ${new Date().toISOString()}.`,
        })
        durations.push(result.elapsedMs)
        statuses.push(result.status)
        if (result.status < 400) succeeded++
        else failed++
      } catch {
        statuses.push('error')
        failed++
      }
    }
  })
  await Promise.all(workers)

  durations.sort((a, b) => a - b)
  return {
    count,
    succeeded,
    failed,
    p50: percentile(durations, 0.5),
    p95: percentile(durations, 0.95),
    statuses,
  }
}

/** Scenario 2: submit one oversized payload. */
export async function oversizedPayload(pageUrl: string, sizeKb: number): Promise<SubmitResult> {
  return submitContactForm(pageUrl, {
    name: 'B'.repeat(10_000),
    email: randomEmail(),
    details: 'A'.repeat(sizeKb * 1024),
  })
}

/** Scenario 3: fire a concurrent burst to probe the write -> email -> rollback race. */
export async function concurrentRace(
  pageUrl: string,
  count: number
): Promise<(number | 'error')[]> {
  const results = await Promise.allSettled(
    Array.from({ length: count }, (_, i) =>
      submitContactForm(pageUrl, {
        name: `Race Test ${i}`,
        email: randomEmail(),
        details: `Concurrent race-condition probe #${i}.`,
      })
    )
  )
  return results.map((r) => (r.status === 'fulfilled' ? r.value.status : 'error'))
}

/** Scenario 4: confirm the server rejects what client-side validation blocks. */
export async function bypassConsentCases(pageUrl: string): Promise<Record<string, SubmitResult>> {
  const cases: Record<string, Parameters<typeof submitContactForm>[1]> = {
    'missing consent': {
      name: 'No Consent',
      email: 'noconsent@example.com',
      details: 'This is a long enough message.',
      consent: '',
    },
    'invalid email': {
      name: 'Bad Email',
      email: 'not-an-email',
      details: 'This is a long enough message.',
    },
    'details too short': { name: 'Short', email: 'short@example.com', details: 'hi' },
  }
  const out: Record<string, SubmitResult> = {}
  for (const [label, fields] of Object.entries(cases))
    out[label] = await submitContactForm(pageUrl, fields)
  return out
}

export type StaticFloodSummary = {
  count: number
  statusCounts: Record<string | number, number>
  p50: number
  p95: number
  p99: number
  wallClockMs: number
}

/** Scenario 5: raw request flood against static/cached pages. */
export async function staticPageFlood(
  baseUrl: string,
  paths: string[],
  count: number,
  concurrency: number
): Promise<StaticFloodSummary> {
  const statusCounts: Record<string | number, number> = {}
  const durations: number[] = []
  const started = performance.now()

  const queue = Array.from({ length: count }, (_, i) => i)
  const workers = Array.from({ length: concurrency }, async () => {
    while (queue.length > 0) {
      const i = queue.shift()
      if (i === undefined) break
      const url = new URL(paths[i % paths.length], baseUrl).toString()
      const reqStarted = performance.now()
      try {
        const res = await fetch(url)
        await res.arrayBuffer()
        durations.push(performance.now() - reqStarted)
        statusCounts[res.status] = (statusCounts[res.status] ?? 0) + 1
      } catch {
        statusCounts['error'] = (statusCounts['error'] ?? 0) + 1
      }
    }
  })
  await Promise.all(workers)
  const wallClockMs = performance.now() - started

  durations.sort((a, b) => a - b)
  return {
    count,
    statusCounts,
    p50: percentile(durations, 0.5),
    p95: percentile(durations, 0.95),
    p99: percentile(durations, 0.99),
    wallClockMs,
  }
}

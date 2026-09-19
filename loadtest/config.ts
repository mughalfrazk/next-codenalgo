/**
 * Shared config for the loadtest scripts. Everything is overridable via env
 * vars so you never have to edit these files to point at a different target.
 */

export const TARGET_URL =
  Deno.env.get('LOADTEST_TARGET') ?? 'https://next-codenalgo-preview.mughalfrazk.workers.dev'

export const CONTACT_PATH = '/contact'

/**
 * Refuses to run against anything that doesn't look like *your* preview/dev
 * deployment. Cheap guardrail against fat-fingering this at a prod URL.
 */
export function assertSafeTarget(url: string): void {
  const allowed = Deno.env.get('LOADTEST_ALLOW_ANY') === '1'
  if (allowed) return

  const isLocal = /^https?:\/\/(localhost|127\.0\.0\.1)/.test(url)
  const isKnownPreview = /preview.*\.workers\.dev$/.test(new URL(url).host)

  if (!isLocal && !isKnownPreview) {
    console.error(
      `Refusing to run against "${url}" — it doesn't look like a preview/dev deployment.\n` +
        `If you're sure, re-run with LOADTEST_ALLOW_ANY=1.`
    )
    Deno.exit(1)
  }
}

/** Default, deliberately small, request count. Override with --count=N. */
export const DEFAULT_COUNT = 10

/** Default concurrency. Override with --concurrency=N. */
export const DEFAULT_CONCURRENCY = 5

export function parseArgs(args: string[]): { count: number; concurrency: number; yes: boolean } {
  const get = (flag: string, fallback: number) => {
    const arg = args.find((a) => a.startsWith(`--${flag}=`))
    return arg ? Number(arg.split('=')[1]) : fallback
  }
  return {
    count: get('count', DEFAULT_COUNT),
    concurrency: get('concurrency', DEFAULT_CONCURRENCY),
    yes: args.includes('--yes'),
  }
}

export function confirmOrExit(message: string, yes: boolean): void {
  if (yes) return
  console.log(`\n${message}`)
  console.log('Re-run the same command with --yes to proceed, or bump --count/--concurrency.\n')
  Deno.exit(0)
}

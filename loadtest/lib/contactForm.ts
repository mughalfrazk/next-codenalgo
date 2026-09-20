/**
 * Talks to the real /contact page the way a no-JS browser would: GET the
 * page, pull out the Server Action's hidden `$ACTION_*` fields (Next embeds
 * these per-request so the action can be invoked without client JS), then
 * POST multipart/form-data back at the same URL with those hidden fields
 * plus whatever visible fields we want to test.
 *
 * This deliberately does NOT hardcode the action id — it re-fetches a fresh
 * one per submission, same as a real visitor loading the page once and
 * submitting. That also means every request here exercises the exact same
 * code path a real bot hitting the public form would.
 */

export type ContactFields = {
  name: string
  email: string
  company?: string
  phone?: string
  service?: string
  budget?: string
  details: string
  consent?: string
}

export type SubmitResult = {
  status: number
  ok: boolean
  bodySnippet: string
  elapsedMs: number
}

/**
 * IMPORTANT: Server Action form posts return HTTP 200 with a full HTML page
 * regardless of whether the action itself succeeded or failed validation —
 * the real result is embedded in React's re-hydrated form state, not the
 * status code. Treat `status`/`ok` here as "the request completed", not
 * "the submission succeeded". The only reliable ground truth is checking the
 * Firestore `contactSubmissions` collection (or the admin panel) for whether
 * a doc actually landed.
 */

async function getHiddenActionFields(pageUrl: string): Promise<Record<string, string>> {
  const res = await fetch(pageUrl)
  const html = await res.text()

  const fields: Record<string, string> = {}
  const inputRe = /<input\s+type="hidden"\s+name="([^"]+)"(?:\s+value="([^"]*)")?\s*\/?>/g
  let match: RegExpExecArray | null
  while ((match = inputRe.exec(html)) !== null) {
    const [, name, rawValue = ''] = match
    fields[name] = rawValue
      .replace(/&quot;/g, '"')
      .replace(/&amp;/g, '&')
      .replace(/&#x27;/g, "'")
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
  }

  if (Object.keys(fields).length === 0) {
    throw new Error(
      `No hidden $ACTION_* fields found at ${pageUrl} — the page markup may have changed. ` +
        'Inspect the page HTML and update lib/contactForm.ts.'
    )
  }

  return fields
}

export async function submitContactForm(
  pageUrl: string,
  fields: ContactFields
): Promise<SubmitResult> {
  const started = performance.now()

  const hidden = await getHiddenActionFields(pageUrl)

  const form = new FormData()
  for (const [key, value] of Object.entries(hidden)) form.append(key, value)
  form.append('name', fields.name)
  form.append('email', fields.email)
  if (fields.company) form.append('company', fields.company)
  if (fields.phone) form.append('phone', fields.phone)
  if (fields.service) form.append('service', fields.service)
  if (fields.budget) form.append('budget', fields.budget)
  form.append('details', fields.details)
  form.append('consent', fields.consent ?? 'on')

  const res = await fetch(pageUrl, { method: 'POST', body: form })
  const body = await res.text()
  const elapsedMs = performance.now() - started

  return { status: res.status, ok: res.ok, bodySnippet: body.slice(0, 200), elapsedMs }
}

export function randomEmail(): string {
  return `loadtest-${crypto.randomUUID().slice(0, 8)}@example.com`
}

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from 'firebase/firestore/lite'
import { Resend } from 'resend'
import { getFirebaseDb, isFirebaseConfigured } from '@/lib/firebase/client'
import {
  CONTACT_SUBMISSIONS_COLLECTION,
  contactSubmissionSchema,
  type ContactSubmission,
  type ContactSubmissionInput,
} from '@/models/contactSubmission'
import { fetchSiteSettings } from '@/data/siteSettings'
import { site } from '@/content/site'

export type SubmitContactResult = { ok: true } | { ok: false; message: string }

export async function fetchContactSubmissions(): Promise<ContactSubmission[]> {
  if (!isFirebaseConfigured()) return []

  const ref = collection(getFirebaseDb(), CONTACT_SUBMISSIONS_COLLECTION)
  const snap = await getDocs(query(ref, orderBy('createdAt', 'desc')))

  return snap.docs
    .map((d) => {
      const parsed = contactSubmissionSchema.safeParse({ id: d.id, ...d.data() })
      return parsed.success ? parsed.data : null
    })
    .filter((s): s is ContactSubmission => s !== null)
}

function buildEmailText(data: ContactSubmissionInput): string {
  return [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    data.company ? `Company: ${data.company}` : null,
    data.phone ? `Phone: ${data.phone}` : null,
    data.service ? `Service: ${data.service}` : null,
    data.budget ? `Budget: ${data.budget}` : null,
    '',
    data.details,
  ]
    .filter(Boolean)
    .join('\n')
}

function buildEmailHtml(data: ContactSubmissionInput, submittedAt: Date): string {
  const firstName = data.name.trim().split(/\s+/)[0]
  const submitted = submittedAt.toLocaleString('en-GB', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })

  const field = (label: string, value: string) => `
    <div>
      <div style="font-size:12px;color:#8a8fa3;">${label}</div>
      <div style="font-size:14px;font-weight:700;color:#1a1d29;">${value}</div>
    </div>`

  return `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#eef0f8;font-family:Arial,Helvetica,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#eef0f8;padding:24px 0;">
      <tr>
        <td align="center">
          <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;">
            <tr>
              <td style="padding:24px 32px;font-size:16px;font-weight:800;color:#1a1d29;">
                CODE &amp; ALGO
              </td>
            </tr>
            <tr>
              <td style="background:linear-gradient(90deg,#386cea,#5a7bef);padding:28px 32px;">
                <div style="font-size:11px;letter-spacing:1px;font-weight:700;color:#dbe4fd;text-transform:uppercase;">[ New Enquiry ]</div>
                <div style="font-size:22px;font-weight:800;color:#ffffff;margin-top:6px;">A new contact form submission</div>
              </td>
            </tr>
            <tr>
              <td style="padding:28px 32px 0;">
                <div style="font-size:11px;letter-spacing:1px;font-weight:700;color:#8a8fa3;text-transform:uppercase;margin-bottom:10px;">Contact Info</div>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f5fb;border-radius:12px;">
                  <tr>
                    <td style="padding:18px 20px;width:50%;">${field('Full Name', data.name)}</td>
                    <td style="padding:18px 20px;width:50%;">${field('Email', data.email)}</td>
                  </tr>
                  <tr>
                    <td style="padding:0 20px 18px;">${field('Company', data.company || '—')}</td>
                    <td style="padding:0 20px 18px;">${field('Phone', data.phone || '—')}</td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 32px 0;">
                <div style="font-size:11px;letter-spacing:1px;font-weight:700;color:#8a8fa3;text-transform:uppercase;margin-bottom:10px;">Enquiry Details</div>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f5fb;border-radius:12px;">
                  <tr>
                    <td style="padding:18px 20px;width:50%;">${field('Service Interested In', data.service || '—')}</td>
                    <td style="padding:18px 20px;width:50%;">${field('Budget Range', data.budget || '—')}</td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 32px 0;">
                <div style="font-size:11px;letter-spacing:1px;font-weight:700;color:#8a8fa3;text-transform:uppercase;margin-bottom:10px;">Project Details</div>
                <div style="background:#f4f5fb;border-left:3px solid #386cea;border-radius:8px;padding:16px 18px;font-size:14px;line-height:1.6;color:#3a3f52;">
                  ${data.details.replace(/</g, '&lt;').replace(/\n/g, '<br/>')}
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 32px 0;font-size:12px;color:#8a8fa3;">
                ✔ Agreed to be contacted about this enquiry
              </td>
            </tr>
            <tr>
              <td style="padding:6px 32px 0;font-size:12px;color:#8a8fa3;">
                Submitted ${submitted} · via ${site.url.replace(/^https?:\/\//, '')}/contact
              </td>
            </tr>
            <tr>
              <td style="padding:24px 32px 32px;">
                <a href="mailto:${data.email}" style="display:inline-block;background:#386cea;color:#ffffff;font-weight:700;font-size:14px;padding:13px 22px;border-radius:10px;text-decoration:none;">
                  Reply to ${firstName}
                </a>
              </td>
            </tr>
            <tr>
              <td style="background:linear-gradient(90deg,#386cea,#5a7bef);padding:20px 32px;font-size:12px;color:#dbe4fd;">
                CODE &amp; ALGO<br/>
                This is an automated notification from your website contact form. Reply directly to respond to the sender.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`
}

/**
 * Persist a contact-form enquiry, then attempt to email it to the admin.
 *
 * The Firestore write happens first so the enquiry is never lost; if the
 * email genuinely fails to send (not merely "no API key configured") the
 * just-written doc is rolled back and the submitter is told to retry, since
 * a saved-but-unnotified enquiry would otherwise go unseen.
 */
export async function submitContactSubmission(
  input: ContactSubmissionInput
): Promise<SubmitContactResult> {
  if (!isFirebaseConfigured()) {
    return {
      ok: false,
      message: 'Something went wrong sending your message. Please email us directly.',
    }
  }

  const ref = collection(getFirebaseDb(), CONTACT_SUBMISSIONS_COLLECTION)
  const createdAt = Date.now()

  let docRef: { id: string }
  try {
    docRef = await addDoc(ref, { ...input, createdAt, emailStatus: 'pending' })
  } catch (err) {
    console.error('[contact] failed to persist submission:', err)
    return {
      ok: false,
      message: 'Something went wrong sending your message. Please email us directly.',
    }
  }

  const apiKey = process.env.RESEND_API_KEY

  if (!apiKey) {
    // No provider configured — keep the submission and mark delivery as skipped.
    await updateDoc(doc(getFirebaseDb(), CONTACT_SUBMISSIONS_COLLECTION, docRef.id), {
      emailStatus: 'skipped',
    })
    return { ok: true }
  }

  try {
    const resend = new Resend(apiKey)
    const to = (await fetchSiteSettings()).email
    const { error } = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL || 'Code & Algo <onboarding@resend.dev>',
      to,
      replyTo: input.email,
      subject: `New enquiry from ${input.name}${input.company ? ` (${input.company})` : ''}`,
      text: buildEmailText(input),
      html: buildEmailHtml(input, new Date(createdAt)),
    })

    if (error) {
      console.error('[contact] Resend error:', error)
      await deleteDoc(doc(getFirebaseDb(), CONTACT_SUBMISSIONS_COLLECTION, docRef.id))
      return {
        ok: false,
        message: 'Something went wrong sending your message. Please email us directly.',
      }
    }

    await updateDoc(doc(getFirebaseDb(), CONTACT_SUBMISSIONS_COLLECTION, docRef.id), {
      emailStatus: 'sent',
    })
    return { ok: true }
  } catch (err) {
    console.error('[contact] unexpected error:', err)
    await deleteDoc(doc(getFirebaseDb(), CONTACT_SUBMISSIONS_COLLECTION, docRef.id))
    return {
      ok: false,
      message: 'Something went wrong sending your message. Please email us directly.',
    }
  }
}

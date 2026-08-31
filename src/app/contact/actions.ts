"use server";

import { Resend } from "resend";
import { contactSchema, type ContactState } from "./schema";
import { site } from "@/content/site";

/**
 * Handle a contact-form submission.
 *
 * Validates on the server (source of truth), then delivers the enquiry by
 * email via Resend when `RESEND_API_KEY` is configured. Without a key the
 * submission is logged server-side and still reported as successful, so the
 * form is fully functional in local/dev without any secrets.
 */
export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const raw = Object.fromEntries(formData.entries());
  const parsed = contactSchema.safeParse(raw);

  if (!parsed.success) {
    const errors: ContactState["errors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof typeof errors;
      /* v8 ignore next -- path[0] always present for field-level Zod errors */
      if (key && !errors[key]) errors[key] = issue.message;
    }
    return { ok: false, message: "Please fix the highlighted fields.", errors };
  }

  const data = parsed.data;

  const summary = [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    data.company ? `Company: ${data.company}` : null,
    data.phone ? `Phone: ${data.phone}` : null,
    data.service ? `Service: ${data.service}` : null,
    data.budget ? `Budget: ${data.budget}` : null,
    "",
    data.details,
  ]
    .filter(Boolean)
    .join("\n");

  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    // No provider configured — log and succeed so the form works without secrets.
    console.info("[contact] submission (email delivery disabled — no RESEND_API_KEY):\n" + summary);
    return { ok: true, message: "Message Sent ✓" };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL || "Code & Algo <onboarding@resend.dev>",
      to: process.env.CONTACT_TO_EMAIL || site.email,
      replyTo: data.email,
      subject: `New enquiry from ${data.name}${data.company ? ` (${data.company})` : ""}`,
      text: summary,
    });

    if (error) {
      console.error("[contact] Resend error:", error);
      return {
        ok: false,
        message: "Something went wrong sending your message. Please email us directly.",
      };
    }

    return { ok: true, message: "Message Sent ✓" };
  } catch (err) {
    console.error("[contact] unexpected error:", err);
    return {
      ok: false,
      message: "Something went wrong sending your message. Please email us directly.",
    };
  }
}

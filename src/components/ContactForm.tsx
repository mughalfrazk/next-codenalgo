'use client'

import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { submitContact } from '@/app/contact/actions'
import type { ContactState } from '@/app/contact/schema'
import { budgetOptions, serviceOptions } from '@/content/contact'

const initialState: ContactState = { ok: false }

const inputClass =
  'w-full rounded-xl border border-black/10 bg-white/70 px-4 py-3.5 text-[14px] font-medium text-ink placeholder:text-muted-2 focus:outline-2 focus:outline-offset-1 focus:outline-brand'

const labelClass = 'sr-only'

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null
  return <p className="mt-1 text-[12px] font-medium text-[#b00020]">{msg}</p>
}

function SubmitButton({ done }: { done: boolean }) {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending || done}
      className="col-span-2 rounded-full bg-brand-gradient px-[30px] py-[15px] text-[14px] font-bold text-white shadow-[0_10px_26px_rgba(56,108,234,.35)] transition-opacity disabled:opacity-70"
    >
      {done ? 'Message Sent ✓' : pending ? 'Sending…' : 'Send Message'}
    </button>
  )
}

export function ContactForm() {
  const [state, formAction] = useActionState(submitContact, initialState)
  const done = state.ok

  return (
    <form action={formAction} className="grid grid-cols-2 gap-4" noValidate>
      <div className="col-span-2 sm:col-span-1">
        <label htmlFor="name" className={labelClass}>
          Full Name
        </label>
        <input id="name" name="name" type="text" placeholder="Full Name" className={inputClass} />
        <FieldError msg={state.errors?.name} />
      </div>

      <div className="col-span-2 sm:col-span-1">
        <label htmlFor="email" className={labelClass}>
          Email
        </label>
        <input id="email" name="email" type="email" placeholder="Email" className={inputClass} />
        <FieldError msg={state.errors?.email} />
      </div>

      <div className="col-span-2 sm:col-span-1">
        <label htmlFor="company" className={labelClass}>
          Company
        </label>
        <input
          id="company"
          name="company"
          type="text"
          placeholder="Company"
          className={inputClass}
        />
      </div>

      <div className="col-span-2 sm:col-span-1">
        <label htmlFor="phone" className={labelClass}>
          Phone (optional)
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          placeholder="Phone (optional)"
          className={inputClass}
        />
      </div>

      <div className="col-span-2 sm:col-span-1">
        <label htmlFor="service" className={labelClass}>
          Service Interested In
        </label>
        <select id="service" name="service" defaultValue="" className={`${inputClass} text-muted`}>
          <option value="">Service Interested In</option>
          {serviceOptions.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div className="col-span-2 sm:col-span-1">
        <label htmlFor="budget" className={labelClass}>
          Budget Range
        </label>
        <select id="budget" name="budget" defaultValue="" className={`${inputClass} text-muted`}>
          <option value="">Budget Range</option>
          {budgetOptions.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>

      <div className="col-span-2">
        <label htmlFor="details" className={labelClass}>
          Project Details
        </label>
        <textarea
          id="details"
          name="details"
          rows={4}
          placeholder="Project Details"
          className={`${inputClass} resize-y`}
        />
        <FieldError msg={state.errors?.details} />
      </div>

      <div className="col-span-2">
        <label className="flex items-center gap-2.5 text-[13px] font-medium text-muted">
          <input type="checkbox" name="consent" className="h-4 w-4 accent-[#386cea]" />I agree to be
          contacted about my enquiry.
        </label>
        <FieldError msg={state.errors?.consent} />
      </div>

      <SubmitButton done={done} />

      <div
        className="col-span-2 text-[12px] leading-[1.5] font-medium text-muted-2"
        aria-live="polite"
      >
        {state.message && !done
          ? state.message
          : "We'll respond within 1 business day. Your details stay confidential."}
      </div>
    </form>
  )
}

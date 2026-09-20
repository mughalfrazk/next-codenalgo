'use client'

import { notifications } from '@mantine/notifications'
import { type FormEvent, useActionState, useEffect, useRef, useState } from 'react'
import { useFormStatus } from 'react-dom'
import { submitContact } from '@/app/(site)/contact/actions'
import type { ContactState } from '@/app/(site)/contact/schema'
import { budgetOptions, serviceOptions } from '@/content/contact'
import { contactSubmissionInputSchema } from '@/models/contactSubmission'

const initialState: ContactState = { ok: false }

const inputClass =
  'w-full rounded-xl border border-black/10 bg-white/70 px-4 py-3.5 text-[14px] font-medium text-ink placeholder:text-muted-2 focus:outline-2 focus:outline-offset-1 focus:outline-brand'

const labelClass = 'sr-only'

type ValidatedField = 'name' | 'email' | 'details' | 'consent'

function validateField(field: ValidatedField, value: string | boolean): string | undefined {
  const result = contactSubmissionInputSchema.shape[field].safeParse(value)
  return result.success ? undefined : result.error.issues[0]?.message
}

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null
  return <p className="mt-1 text-[12px] font-medium text-[#b00020]">{msg}</p>
}

function SubmitButton({ showSuccess }: { showSuccess: boolean }) {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending || showSuccess}
      className="col-span-2 cursor-pointer rounded-full bg-brand-gradient px-[30px] py-[15px] text-[14px] font-bold text-white shadow-[0_10px_26px_rgba(56,108,234,.35)] transition-opacity disabled:opacity-70"
    >
      {showSuccess ? 'Message Sent ✓' : pending ? 'Sending…' : 'Send Message'}
    </button>
  )
}

export function ContactForm() {
  const [state, formAction] = useActionState(submitContact, initialState)
  const done = state.ok
  const formRef = useRef<HTMLFormElement>(null)
  const [touched, setTouched] = useState<Partial<Record<ValidatedField, boolean>>>({})
  const [clientErrors, setClientErrors] = useState<Partial<Record<ValidatedField, string>>>({})
  const [showSuccess, setShowSuccess] = useState(false)

  // Clear local validation state exactly once when a submission newly succeeds
  // ("adjusting state when a prop changes" — https://react.dev/reference/react/useState#storing-information-from-previous-renders).
  const [prevDone, setPrevDone] = useState(false)
  if (done !== prevDone) {
    setPrevDone(done)
    setShowSuccess(done)
    if (done) {
      setTouched({})
      setClientErrors({})
    }
  }

  useEffect(() => {
    if (!state.ok) {
      if (state.message && !state.errors) {
        notifications.show({ title: 'Error', message: state.message, color: 'red' })
      }
      return
    }

    notifications.show({ title: 'Message sent', message: 'Message Sent ✓', color: 'green' })
    formRef.current?.reset()
    const timeout = setTimeout(() => setShowSuccess(false), 2000)
    return () => clearTimeout(timeout)
  }, [state])

  function handleFieldChange(field: ValidatedField, value: string | boolean) {
    if (!touched[field]) return
    setClientErrors((prev) => ({ ...prev, [field]: validateField(field, value) }))
  }

  function handleFieldBlur(field: ValidatedField, value: string | boolean) {
    setTouched((prev) => ({ ...prev, [field]: true }))
    setClientErrors((prev) => ({ ...prev, [field]: validateField(field, value) }))
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    const data = new FormData(e.currentTarget)
    const fields: ValidatedField[] = ['name', 'email', 'details', 'consent']
    const nextTouched: Partial<Record<ValidatedField, boolean>> = {}
    const nextErrors: Partial<Record<ValidatedField, string>> = {}
    let hasError = false

    for (const field of fields) {
      const raw = field === 'consent' ? data.get(field) === 'on' : (data.get(field) as string)
      nextTouched[field] = true
      const error = validateField(field, raw as string | boolean)
      if (error) {
        nextErrors[field] = error
        hasError = true
      }
    }

    setTouched(nextTouched)
    setClientErrors(nextErrors)

    if (hasError) e.preventDefault()
  }

  function errorFor(field: ValidatedField): string | undefined {
    return clientErrors[field] ?? state.errors?.[field]
  }

  return (
    <form
      ref={formRef}
      action={formAction}
      onSubmit={handleSubmit}
      className="grid grid-cols-2 gap-4"
      noValidate
    >
      <div className="col-span-2 sm:col-span-1">
        <label htmlFor="name" className={labelClass}>
          Full Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Full Name"
          className={inputClass}
          onChange={(e) => handleFieldChange('name', e.target.value)}
          onBlur={(e) => handleFieldBlur('name', e.target.value)}
        />
        <FieldError msg={errorFor('name')} />
      </div>

      <div className="col-span-2 sm:col-span-1">
        <label htmlFor="email" className={labelClass}>
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          className={inputClass}
          onChange={(e) => handleFieldChange('email', e.target.value)}
          onBlur={(e) => handleFieldBlur('email', e.target.value)}
        />
        <FieldError msg={errorFor('email')} />
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
          onChange={(e) => handleFieldChange('details', e.target.value)}
          onBlur={(e) => handleFieldBlur('details', e.target.value)}
        />
        <FieldError msg={errorFor('details')} />
      </div>

      <div className="col-span-2">
        <label className="flex items-center gap-2.5 text-[13px] font-medium text-muted">
          <input
            type="checkbox"
            name="consent"
            className="h-4 w-4 appearance-none rounded border border-black/20 bg-white checked:appearance-auto checked:accent-[#386cea]"
            onChange={(e) => handleFieldChange('consent', e.target.checked)}
            onBlur={(e) => handleFieldBlur('consent', e.target.checked)}
          />
          I agree to be contacted about my enquiry.
        </label>
        <FieldError msg={errorFor('consent')} />
      </div>

      <SubmitButton showSuccess={showSuccess} />

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

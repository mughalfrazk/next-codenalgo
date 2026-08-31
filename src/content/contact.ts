import type { QA } from './services'

export const contactHero = {
  eyebrow: 'Contact',
  title: "Your Vision. Our Code. Let's Talk.",
  subtitle: "Tell us what you're building. We'll get back to you within one business day.",
}

export const serviceOptions = [
  'AI / ML Solutions',
  'Custom Software',
  'Enterprise Solutions',
  'Staff Augmentation',
  'Managed Infrastructure',
  'Other',
]

export const budgetOptions = ['Under $25k', '$25k – $100k', '$100k – $250k', '$250k+']

export const contactFaq: QA[] = [
  { q: 'How quickly will I hear back?', a: 'We respond to every enquiry within one business day.' },
  {
    q: 'Do you sign NDAs?',
    a: "Yes — we're happy to sign an NDA before discussing project details.",
  },
  {
    q: 'Do you work with international clients?',
    a: 'Yes, most of our clients are outside the UK — we work across time zones as standard.',
  },
]

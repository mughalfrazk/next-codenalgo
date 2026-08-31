export const site = {
  name: 'Code & Algo',
  tagline: "Software development and IT consultancy for teams building what's next.",
  email: 'info@codenalgo.com',
  phone: '+44 774 206 9713',
  address: '124 City Road, London HA9 0AL, UK',
  addressShort: 'London HA9 0AL, UK',
  businessHours: 'Mon–Fri, 9:00–18:00 GMT',
  url: 'https://codenalgo.com',
  legal: '© 2026 Code & Algo Ltd. Company No. 00000000. All rights reserved.',
} as const

export const nav = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Contact', href: '/contact' },
] as const

export const footerCompany = [
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Contact', href: '/contact' },
] as const

export const socials = [
  { label: 'LinkedIn', short: 'in', href: '#' },
  { label: 'GitHub', short: 'gh', href: '#' },
  { label: 'X', short: 'X', href: '#' },
] as const

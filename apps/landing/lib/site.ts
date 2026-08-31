export const siteConfig = {
  name: 'PolkAudit',
  description:
    'Governance transparency for Polkadot teams with finalized block indexing, treasury insights, and audit-ready exports.',
  domain: process.env.NEXT_PUBLIC_SITE_URL || 'https://polkaudit.io',
  links: {
    demo: process.env.NEXT_PUBLIC_DEMO_URL || 'https://demo.polkaudit.io',
    dashboard: process.env.NEXT_PUBLIC_DASHBOARD_URL || 'https://demo.polkaudit.io',
    docs: process.env.NEXT_PUBLIC_DOCS_URL || 'https://github.com/vjbollavarapu/polkaudit/tree/main/docs',
    api: process.env.NEXT_PUBLIC_API_DOCS_URL || 'https://demo.polkaudit.io/api/docs',
    github: process.env.NEXT_PUBLIC_GITHUB_URL || 'https://github.com/vjbollavarapu/polkaudit',
    contact: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'hello@polkaudit.io',
    discussion:
      process.env.NEXT_PUBLIC_DISCUSSION_URL || 'https://polkadot.polkassembly.io/',
    /** YouTube watch or youtu.be URL — leave empty until video is published */
    demoVideo: process.env.NEXT_PUBLIC_DEMO_VIDEO_URL || '',
  },
} as const

export const navItems = [
  { label: 'Product', href: '#product' },
  { label: 'Demo', href: '#demo' },
  { label: 'Use Cases', href: '#use-cases' },
  { label: 'Security', href: '#security' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
] as const

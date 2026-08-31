'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

export default function TailwindTokens() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedCode(text)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const codeExamples = [
    {
      title: 'Semantic Color Variables',
      code: `--background: #0a0e27;
--foreground: #e8eaef;
--card: #14192e;
--primary: #6d28d9;
--accent: #7c3aed;
--muted: #374151;
--border: #1e293b;`
    },
    {
      title: 'Spacing Scale',
      code: `p-0, p-1 (4px), p-2 (8px), p-3 (12px)
p-4 (16px), p-6 (24px), p-8 (32px)
p-12 (48px), p-16 (64px)`
    },
    {
      title: 'Typography Scale',
      code: `text-xs (12px)    - Captions
text-sm (14px)    - Small text
text-base (16px)  - Body text
text-lg (20px)    - Headings
text-2xl (24px)   - Section title
text-3xl (28px)   - Major section
text-4xl (32px)   - Page title`
    },
    {
      title: 'Border & Rounded',
      code: `rounded-none   (0px)
rounded-sm     (2px)
rounded        (4px)
rounded-md     (6px)
rounded-lg     (8px)
rounded-full   (9999px)`
    }
  ]

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-4">Tailwind Tokens & Reference</h2>
        <p className="text-muted-foreground">
          Complete reference for all Tailwind CSS tokens and utilities used in the PolkAudit design system.
        </p>
      </div>

      {/* Quick Reference */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Quick Reference</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {codeExamples.map((example, idx) => (
            <div key={idx} className="p-4 rounded-lg border border-border bg-background overflow-hidden">
              <p className="text-xs font-semibold text-muted-foreground uppercase mb-3">{example.title}</p>
              <div className="relative group">
                <pre className="text-xs text-foreground font-mono whitespace-pre-wrap break-words overflow-x-auto">
                  {example.code}
                </pre>
                <button
                  onClick={() => copyToClipboard(example.code)}
                  className="absolute top-2 right-2 p-1.5 opacity-0 group-hover:opacity-100 transition-opacity bg-card border border-border rounded"
                  aria-label="Copy code"
                >
                  {copiedCode === example.code ? (
                    <Check className="w-3 h-3 text-green-600" />
                  ) : (
                    <Copy className="w-3 h-3 text-muted-foreground" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Color Tokens */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Color Tokens</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-card border-b border-border">
              <tr>
                <th className="px-4 py-2 text-left font-semibold text-foreground">Token</th>
                <th className="px-4 py-2 text-left font-semibold text-foreground">Variable</th>
                <th className="px-4 py-2 text-left font-semibold text-foreground">Usage</th>
                <th className="px-4 py-2 text-left font-semibold text-foreground">Example</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                { token: 'bg-background', var: '--background', usage: 'Page backgrounds', class: 'bg-background' },
                { token: 'text-foreground', var: '--foreground', usage: 'Primary text', class: 'text-foreground' },
                { token: 'bg-card', var: '--card', usage: 'Card backgrounds', class: 'bg-card' },
                { token: 'bg-primary', var: '--primary', usage: 'Primary actions', class: 'bg-primary text-primary-foreground' },
                { token: 'bg-accent', var: '--accent', usage: 'Highlights', class: 'bg-accent' },
                { token: 'text-muted', var: '--muted', usage: 'Disabled states', class: 'text-muted-foreground' },
                { token: 'border-border', var: '--border', usage: 'Dividers', class: 'border border-border' },
              ].map(item => (
                <tr key={item.token} className="hover:bg-card transition-colors">
                  <td className="px-4 py-2 font-mono text-xs text-accent">{item.token}</td>
                  <td className="px-4 py-2 font-mono text-xs text-muted-foreground">{item.var}</td>
                  <td className="px-4 py-2 text-xs text-muted-foreground">{item.usage}</td>
                  <td className="px-4 py-2">
                    <div className={`px-2 py-1 rounded text-xs ${item.class}`}>
                      Sample
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Responsive Utilities */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Responsive Utilities</h3>
        <div className="space-y-3">
          {[
            { prefix: 'sm:', breakpoint: '640px', example: 'sm:px-6 sm:grid-cols-2' },
            { prefix: 'md:', breakpoint: '768px', example: 'md:text-xl md:w-1/2' },
            { prefix: 'lg:', breakpoint: '1024px', example: 'lg:px-8 lg:grid-cols-3' },
            { prefix: 'xl:', breakpoint: '1280px', example: 'xl:grid-cols-4' },
          ].map(resp => (
            <div key={resp.prefix} className="p-3 rounded-lg bg-card border border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-mono font-semibold text-accent">{resp.prefix}</p>
                  <p className="text-xs text-muted-foreground">@media (min-width: {resp.breakpoint})</p>
                </div>
                <p className="text-xs text-muted-foreground font-mono">{resp.example}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Common Patterns */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Common Tailwind Patterns</h3>
        <div className="space-y-4">
          {[
            {
              name: 'Page Container',
              code: 'max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'
            },
            {
              name: 'Flex Center',
              code: 'flex items-center justify-center'
            },
            {
              name: 'Flex Between',
              code: 'flex items-center justify-between'
            },
            {
              name: 'Grid 3 Column',
              code: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'
            },
            {
              name: 'Card with Hover',
              code: 'p-6 rounded-lg bg-card border border-border hover:border-accent transition-colors'
            },
            {
              name: 'Button Base',
              code: 'px-4 py-2 rounded-lg font-semibold text-sm transition-colors'
            },
            {
              name: 'Text Balance',
              code: 'text-balance text-lg font-semibold text-foreground'
            },
            {
              name: 'Focus Ring',
              code: 'focus:outline-none focus:ring-2 focus:ring-accent'
            },
          ].map(pattern => (
            <div key={pattern.name} className="p-4 rounded-lg bg-card border border-border">
              <p className="text-sm font-semibold text-foreground mb-2">{pattern.name}</p>
              <div className="relative group">
                <pre className="text-xs text-muted-foreground font-mono bg-background p-2 rounded overflow-x-auto">
                  {pattern.code}
                </pre>
                <button
                  onClick={() => copyToClipboard(pattern.code)}
                  className="absolute top-1 right-1 p-1 opacity-0 group-hover:opacity-100 transition-opacity bg-card border border-border rounded"
                >
                  {copiedCode === pattern.code ? (
                    <Check className="w-3 h-3 text-green-600" />
                  ) : (
                    <Copy className="w-3 h-3 text-muted-foreground" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Spacing Scale */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Spacing Scale Reference</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
          {[0, 1, 2, 3, 4, 6, 8, 12, 16, 20, 24, 32].map(size => {
            const px = size === 0 ? '0' : (size * 4) + 'px'
            return (
              <div key={size} className="p-2 rounded bg-card border border-border text-center">
                <p className="font-mono font-semibold text-accent">p-{size}</p>
                <p className="text-muted-foreground mt-1">{px}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Transition Utilities */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Transition Utilities</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            'transition-colors',
            'transition-all',
            'transition-opacity',
            'transition-transform',
            'duration-150',
            'duration-200',
            'duration-300',
            'ease-in-out',
            'hover:bg-secondary',
            'active:scale-95',
            'focus:ring-2',
          ].map(utility => (
            <div key={utility} className="px-3 py-2 rounded bg-card border border-border font-mono text-xs text-accent hover:border-accent transition-colors cursor-pointer">
              {utility}
            </div>
          ))}
        </div>
      </div>

      {/* Accessibility Utilities */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Accessibility Utilities</h3>
        <div className="space-y-2">
          {[
            { utility: 'sr-only', description: 'Screen reader only text - hidden visually' },
            { utility: 'focus:ring-2', description: 'Visible focus indicator for keyboard navigation' },
            { utility: 'focus:outline-none', description: 'Remove default browser outline when using custom ring' },
            { utility: 'aria-label=""', description: 'Provide accessible names for icon buttons' },
          ].map(item => (
            <div key={item.utility} className="p-3 rounded-lg bg-card border border-border">
              <p className="font-mono text-sm text-accent font-semibold">{item.utility}</p>
              <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Best Practices */}
      <div className="bg-green-900/10 border border-green-700/30 rounded-lg p-4">
        <p className="font-semibold text-green-600 mb-3">Tailwind Best Practices</p>
        <ul className="text-sm text-green-700 space-y-1">
          <li>✓ Use semantic color tokens (primary, accent, muted) not hard-coded hex values</li>
          <li>✓ Always include responsive prefixes: sm:, md:, lg: for all utilities</li>
          <li>✓ Prefer gap and space-y classes over individual margins</li>
          <li>✓ Use max-w and mx-auto for consistent container sizing</li>
          <li>✓ Apply transitions for all interactive state changes</li>
          <li>✓ Always include focus states and keyboard navigation utilities</li>
          <li>✓ Use opacity modifiers (opacity-50, opacity-75) instead of arbitrary colors</li>
        </ul>
      </div>

      {/* Resources */}
      <div className="p-4 rounded-lg bg-blue-900/10 border border-blue-700/30">
        <p className="font-semibold text-blue-600 mb-2">Resources</p>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Tailwind CSS docs: <span className="font-mono">tailwindcss.com</span></li>
          <li>• Our globals.css: Defines all custom color tokens</li>
          <li>• shadcn/ui: Pre-built components using these tokens</li>
        </ul>
      </div>
    </div>
  )
}

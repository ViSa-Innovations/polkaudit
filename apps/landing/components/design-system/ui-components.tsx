'use client'

import { useState } from 'react'
import { ChevronDown, Copy, Check } from 'lucide-react'

export default function UIComponents() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0)

  const copyCode = (code: string, index: number) => {
    navigator.clipboard.writeText(code)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-4">UI Components</h2>
        <p className="text-muted-foreground">
          Reusable component patterns built with shadcn/ui principles. All components are accessible and follow our design system.
        </p>
      </div>

      {/* Buttons */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Buttons</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-lg bg-card border border-border">
            <p className="text-sm font-semibold text-muted-foreground mb-4">Primary Button</p>
            <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-semibold text-sm">
              Primary Action
            </button>
            <div className="mt-3 p-2 bg-background rounded text-xs font-mono text-muted-foreground overflow-x-auto relative group">
              <code>bg-primary text-primary-foreground</code>
              <button
                onClick={() => copyCode('bg-primary text-primary-foreground', 0)}
                className="absolute right-1 top-1 p-1 hover:bg-card rounded"
              >
                {copiedIndex === 0 ? <Check className="w-3 h-3 text-green-600" /> : <Copy className="w-3 h-3 text-muted-foreground" />}
              </button>
            </div>
          </div>

          <div className="p-6 rounded-lg bg-card border border-border">
            <p className="text-sm font-semibold text-muted-foreground mb-4">Secondary Button</p>
            <button className="px-4 py-2 rounded-lg border border-border text-foreground hover:bg-card transition-colors font-semibold text-sm">
              Secondary Action
            </button>
            <div className="mt-3 p-2 bg-background rounded text-xs font-mono text-muted-foreground overflow-x-auto relative group">
              <code>border border-border hover:bg-card</code>
              <button
                onClick={() => copyCode('border border-border hover:bg-card', 1)}
                className="absolute right-1 top-1 p-1 hover:bg-card rounded"
              >
                {copiedIndex === 1 ? <Check className="w-3 h-3 text-green-600" /> : <Copy className="w-3 h-3 text-muted-foreground" />}
              </button>
            </div>
          </div>

          <div className="p-6 rounded-lg bg-card border border-border">
            <p className="text-sm font-semibold text-muted-foreground mb-4">Tertiary Button</p>
            <button className="px-4 py-2 text-foreground hover:bg-secondary rounded-lg transition-colors font-semibold text-sm">
              Tertiary Action
            </button>
            <div className="mt-3 p-2 bg-background rounded text-xs font-mono text-muted-foreground overflow-x-auto relative group">
              <code>text-foreground hover:bg-secondary</code>
              <button
                onClick={() => copyCode('text-foreground hover:bg-secondary', 2)}
                className="absolute right-1 top-1 p-1 hover:bg-card rounded"
              >
                {copiedIndex === 2 ? <Check className="w-3 h-3 text-green-600" /> : <Copy className="w-3 h-3 text-muted-foreground" />}
              </button>
            </div>
          </div>

          <div className="p-6 rounded-lg bg-card border border-border">
            <p className="text-sm font-semibold text-muted-foreground mb-4">Disabled Button</p>
            <button disabled className="px-4 py-2 rounded-lg bg-muted text-muted-foreground cursor-not-allowed font-semibold text-sm">
              Disabled
            </button>
            <div className="mt-3 p-2 bg-background rounded text-xs font-mono text-muted-foreground overflow-x-auto relative group">
              <code>bg-muted text-muted-foreground disabled</code>
              <button
                onClick={() => copyCode('bg-muted text-muted-foreground disabled', 3)}
                className="absolute right-1 top-1 p-1 hover:bg-card rounded"
              >
                {copiedIndex === 3 ? <Check className="w-3 h-3 text-green-600" /> : <Copy className="w-3 h-3 text-muted-foreground" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Cards */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Cards</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-6 rounded-lg bg-card border border-border hover:border-accent transition-colors">
            <p className="text-sm font-semibold text-accent mb-2">CARD LABEL</p>
            <h4 className="text-lg font-semibold text-foreground mb-2">Card Title</h4>
            <p className="text-sm text-muted-foreground">Card content with supporting description text</p>
          </div>

          <div className="p-6 rounded-lg bg-card border border-border hover:shadow-lg transition-shadow">
            <p className="text-sm font-semibold text-muted-foreground mb-2">FEATURE</p>
            <p className="text-3xl font-bold text-foreground mb-1">42</p>
            <p className="text-sm text-muted-foreground">Metric description goes here</p>
          </div>
        </div>
      </div>

      {/* Input Fields */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Input Fields</h3>
        <div className="space-y-4 max-w-md">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Text Input</label>
            <input
              type="text"
              placeholder="Enter text..."
              className="w-full px-3 py-2 rounded-lg bg-input border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Email Input</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-3 py-2 rounded-lg bg-input border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Select Field</label>
            <select className="w-full px-3 py-2 rounded-lg bg-input border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-accent">
              <option>Option 1</option>
              <option>Option 2</option>
              <option>Option 3</option>
            </select>
          </div>
        </div>
      </div>

      {/* Badges & Labels */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Badges & Labels</h3>
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold">Primary</span>
          <span className="px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-semibold">Accent</span>
          <span className="px-3 py-1 rounded-full bg-muted text-muted-foreground text-xs font-semibold">Muted</span>
          <span className="px-3 py-1 rounded-full border border-border text-foreground text-xs font-semibold">Outlined</span>
          <span className="px-3 py-1 rounded-full bg-green-900/30 text-green-600 text-xs font-semibold">Success</span>
          <span className="px-3 py-1 rounded-full bg-red-900/30 text-red-600 text-xs font-semibold">Error</span>
        </div>
      </div>

      {/* Alerts */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Alert States</h3>
        <div className="space-y-3">
          <div className="p-4 rounded-lg bg-green-900/10 border border-green-700/30 text-green-600">
            <p className="font-semibold text-sm">Success</p>
            <p className="text-sm mt-1">Operation completed successfully</p>
          </div>
          <div className="p-4 rounded-lg bg-blue-900/10 border border-blue-700/30 text-blue-600">
            <p className="font-semibold text-sm">Info</p>
            <p className="text-sm mt-1">Here&apos;s some helpful information</p>
          </div>
          <div className="p-4 rounded-lg bg-yellow-900/10 border border-yellow-700/30 text-yellow-600">
            <p className="font-semibold text-sm">Warning</p>
            <p className="text-sm mt-1">Please be careful with this action</p>
          </div>
          <div className="p-4 rounded-lg bg-red-900/10 border border-red-700/30 text-red-600">
            <p className="font-semibold text-sm">Error</p>
            <p className="text-sm mt-1">Something went wrong</p>
          </div>
        </div>
      </div>

      {/* Accordion / Expandable */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Accordion Pattern</h3>
        <div className="space-y-2 max-w-2xl">
          {[
            { q: 'What is PolkAudit?', a: 'PolkAudit provides transparent governance tracking and treasury auditing for Polkadot teams.' },
            { q: 'How does it work?', a: 'We index live finalized blocks, extract governance data, and provide comprehensive audit exports.' },
            { q: 'Is it secure?', a: 'Yes, we use enterprise-grade security with API authentication and Row Level Security.' },
          ].map((item, idx) => (
            <div key={idx} className="border border-border rounded-lg overflow-hidden">
              <button
                onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                className="w-full px-4 py-3 flex items-center justify-between hover:bg-card transition-colors"
              >
                <span className="font-semibold text-foreground text-sm text-left">{item.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-muted-foreground transition-transform ${expandedFaq === idx ? 'rotate-180' : ''}`}
                />
              </button>
              {expandedFaq === idx && (
                <div className="px-4 py-3 border-t border-border bg-card">
                  <p className="text-sm text-muted-foreground">{item.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Dividers */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Dividers</h3>
        <div className="space-y-4">
          <div>
            <p className="text-sm font-semibold text-muted-foreground mb-2">Simple Border</p>
            <div className="border-t border-border"></div>
          </div>
          <div>
            <p className="text-sm font-semibold text-muted-foreground mb-2">With Label</p>
            <div className="flex items-center gap-4">
              <div className="flex-1 border-t border-border"></div>
              <span className="text-xs font-semibold text-muted-foreground uppercase">or</span>
              <div className="flex-1 border-t border-border"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Best Practices */}
      <div className="bg-green-900/10 border border-green-700/30 rounded-lg p-4">
        <p className="font-semibold text-green-600 mb-3">Component Guidelines</p>
        <ul className="text-sm text-green-700 space-y-1">
          <li>✓ Always use semantic colors (primary, accent, muted) instead of hard-coded values</li>
          <li>✓ Include proper focus states and keyboard navigation for accessibility</li>
          <li>✓ Use consistent padding and border-radius across similar components</li>
          <li>✓ Test contrast ratios meet WCAG AA minimums</li>
          <li>✓ Consider hover, focus, and active states for interactive elements</li>
        </ul>
      </div>
    </div>
  )
}

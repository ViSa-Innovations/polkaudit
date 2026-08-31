import BrandFoundation from '@/components/design-system/brand-foundation'
import type { Metadata } from 'next'
import ColorSystem from '@/components/design-system/color-system'
import Typography from '@/components/design-system/typography'
import SpacingLayout from '@/components/design-system/spacing-layout'
import UIComponents from '@/components/design-system/ui-components'
import DataVisuals from '@/components/design-system/data-visuals'
import Motion from '@/components/design-system/motion'
import VoiceCopy from '@/components/design-system/voice-copy'
import TailwindTokens from '@/components/design-system/tailwind-tokens'

export const metadata: Metadata = {
  title: 'Design System - PolkAudit',
  description: 'Comprehensive design system documentation and component library for PolkAudit',
  robots: {
    index: false,
    follow: false,
  },
}

export default function DesignSystemPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Design System</h1>
              <p className="text-muted-foreground mt-2">PolkAudit Visual & Component Guidelines</p>
            </div>
            <a
              href="/"
              className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-medium"
            >
              Back to Home
            </a>
          </div>
        </div>
      </header>

      {/* Navigation Sidebar */}
      <div className="flex min-h-screen">
        <aside className="w-64 border-r border-border bg-card/50 sticky top-20 max-h-[calc(100vh-80px)] overflow-y-auto hidden lg:block">
          <nav className="p-6 space-y-1">
            {[
              { id: 'brand', label: 'Brand Foundation' },
              { id: 'color', label: 'Color System' },
              { id: 'typography', label: 'Typography' },
              { id: 'spacing', label: 'Spacing & Layout' },
              { id: 'components', label: 'UI Components' },
              { id: 'data', label: 'Data Visuals' },
              { id: 'motion', label: 'Motion' },
              { id: 'voice', label: 'Voice & Copy' },
              { id: 'tokens', label: 'Tailwind Tokens' },
            ].map(item => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="block px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-24">
            <section id="brand">
              <BrandFoundation />
            </section>

            <section id="color">
              <ColorSystem />
            </section>

            <section id="typography">
              <Typography />
            </section>

            <section id="spacing">
              <SpacingLayout />
            </section>

            <section id="components">
              <UIComponents />
            </section>

            <section id="data">
              <DataVisuals />
            </section>

            <section id="motion">
              <Motion />
            </section>

            <section id="voice">
              <VoiceCopy />
            </section>

            <section id="tokens">
              <TailwindTokens />
            </section>

            {/* Footer */}
            <footer className="pt-12 border-t border-border">
              <p className="text-sm text-muted-foreground text-center">
                Last updated: July 2026 | PolkAudit Design System v1.0
              </p>
            </footer>
          </div>
        </div>
      </div>
    </main>
  )
}

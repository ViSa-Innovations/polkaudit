export default function BrandFoundation() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-4">Brand Foundation</h2>
        <p className="text-muted-foreground">
          The PolkAudit brand represents trust, transparency, and enterprise reliability in Polkadot governance.
        </p>
      </div>

      <div className="grid gap-8">
        {/* Brand Pillars */}
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4">Brand Pillars</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { title: 'Trustworthy', desc: 'Enterprise-grade security and reliability' },
              { title: 'Transparent', desc: 'Clear, honest communication' },
              { title: 'Professional', desc: 'Polished, minimal aesthetic' },
              { title: 'Accessible', desc: 'Inclusive design for all users' },
            ].map(pillar => (
              <div key={pillar.title} className="p-4 rounded-lg bg-card border border-border">
                <h4 className="font-semibold text-foreground mb-1">{pillar.title}</h4>
                <p className="text-sm text-muted-foreground">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Design Principles */}
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4">Design Principles</h3>
          <div className="space-y-3">
            {[
              { num: '01', title: 'Clarity First', desc: 'Information should be immediately understandable without cognitive load' },
              { num: '02', title: 'Minimal & Focused', desc: 'Remove unnecessary elements; every visual decision must serve a purpose' },
              { num: '03', title: 'Professional Elegance', desc: 'Enterprise-appropriate design with refined details and careful spacing' },
              { num: '04', title: 'Dark Mode Native', desc: 'Design for dark theme first; optimize for reduced eye strain and fintech aesthetics' },
              { num: '05', title: 'Consistent Systems', desc: 'Use predictable patterns and reusable components across all interfaces' },
              { num: '06', title: 'Accessible Always', desc: 'WCAG AA compliance minimum; consider color contrast, keyboard nav, and screen readers' },
            ].map(principle => (
              <div key={principle.num} className="flex gap-4 p-3 rounded-lg hover:bg-card transition-colors">
                <div className="text-accent font-bold text-lg">{principle.num}</div>
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground">{principle.title}</h4>
                  <p className="text-sm text-muted-foreground">{principle.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Brand Voice */}
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4">Brand Voice</h3>
          <div className="bg-card border border-border rounded-lg p-6 space-y-4">
            <div>
              <h4 className="font-semibold text-foreground mb-2">Tone & Manner</h4>
              <p className="text-muted-foreground text-sm">
                Professional yet approachable. We avoid hype and unnecessary jargon. We speak with confidence about complex topics while remaining clear and direct.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
              <div>
                <p className="text-xs font-semibold text-accent uppercase mb-2">✓ Do</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>Be precise and concrete</li>
                  <li>Use active voice</li>
                  <li>Explain the benefit, not just feature</li>
                  <li>Use data to support claims</li>
                </ul>
              </div>
              <div>
                <p className="text-xs font-semibold text-foreground uppercase mb-2">✗ Don&apos;t</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>Use marketing hype</li>
                  <li>Assume user knowledge</li>
                  <li>Over-use exclamation marks</li>
                  <li>Be unnecessarily technical</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

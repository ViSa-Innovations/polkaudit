export default function Typography() {
  const scales = [
    { size: '32px', leading: '1.2', weight: 'bold', class: 'text-4xl font-bold', label: 'Display / Page Title', example: 'Design System' },
    { size: '28px', leading: '1.3', weight: '600', class: 'text-3xl font-semibold', label: 'Heading 1 / Section', example: 'Brand Principles' },
    { size: '24px', leading: '1.3', weight: '600', class: 'text-2xl font-semibold', label: 'Heading 2 / Subsection', example: 'Color Palette' },
    { size: '20px', leading: '1.4', weight: '600', class: 'text-xl font-semibold', label: 'Heading 3', example: 'Typography Scale' },
    { size: '16px', leading: '1.5', weight: '400', class: 'text-base', label: 'Body / Default', example: 'Regular paragraph text for reading' },
    { size: '14px', leading: '1.5', weight: '400', class: 'text-sm', label: 'Small / Secondary', example: 'Supporting text and descriptions' },
    { size: '12px', leading: '1.4', weight: '500', class: 'text-xs', label: 'Caption / Label', example: 'Labels, hints, and metadata' },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-4">Typography</h2>
        <p className="text-muted-foreground">
          We use a carefully selected typography system that balances readability with enterprise aesthetics.
        </p>
      </div>

      {/* Font Stack */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Font Stack</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg border border-border">
            <p className="text-xs font-semibold text-muted-foreground uppercase mb-3">Heading Font</p>
            <p className="font-semibold text-foreground text-lg mb-2">System UI Fonts</p>
            <p className="font-mono text-xs text-muted-foreground break-words">
              ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;
            </p>
            <p className="text-sm text-muted-foreground mt-3">Used for all headings and display text for maximum platform consistency.</p>
          </div>
          <div className="p-4 rounded-lg border border-border">
            <p className="text-xs font-semibold text-muted-foreground uppercase mb-3">Body Font</p>
            <p className="text-foreground text-lg mb-2">System UI Fonts</p>
            <p className="font-mono text-xs text-muted-foreground break-words">
              Same as headings for consistency across all interfaces.
            </p>
            <p className="text-sm text-muted-foreground mt-3">Optimized for screen reading and long-form content clarity.</p>
          </div>
        </div>
      </div>

      {/* Typography Scale */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Type Scale</h3>
        <div className="space-y-6">
          {scales.map((scale, idx) => (
            <div key={idx} className="border-l-4 border-accent pl-4">
              <div className={scale.class}>
                {scale.example}
              </div>
              <div className="mt-2 grid grid-cols-2 gap-4 text-xs text-muted-foreground font-mono">
                <div>
                  <p className="font-semibold text-foreground">{scale.label}</p>
                </div>
                <div className="text-right">
                  <p>{scale.size} / {scale.leading}</p>
                  <p>Weight: {scale.weight}</p>
                </div>
              </div>
              <div className="mt-2">
                <span className="inline-block bg-card px-2 py-1 rounded text-xs font-mono text-muted-foreground">
                  {scale.class}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Line Height & Spacing */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Line Height & Spacing</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-card border border-border">
            <p className="font-semibold text-foreground mb-3">Line Height Standards</p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>• <strong>Headings:</strong> 1.2 (tight, confident)</p>
              <p>• <strong>Body:</strong> 1.5 (relaxed, readable)</p>
              <p>• <strong>Captions:</strong> 1.4 (compact)</p>
            </div>
            <p className="text-xs text-muted-foreground mt-3">Provides comfortable reading rhythm while maintaining visual hierarchy.</p>
          </div>
          <div className="p-4 rounded-lg bg-card border border-border">
            <p className="font-semibold text-foreground mb-3">Letter Spacing</p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>• <strong>Default:</strong> Normal (0)</p>
              <p>• <strong>Display:</strong> Slightly tighter</p>
              <p>• <strong>Uppercase:</strong> +0.05em (slight expansion)</p>
            </div>
            <p className="text-xs text-muted-foreground mt-3">Maintains readability across all sizes and styles.</p>
          </div>
        </div>
      </div>

      {/* Weight Usage */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Font Weights</h3>
        <div className="space-y-3">
          <div className="p-3 rounded-lg bg-card border border-border">
            <p className="font-bold text-foreground">Bold (700)</p>
            <p className="text-xs text-muted-foreground">Headings, emphasis, important labels</p>
          </div>
          <div className="p-3 rounded-lg bg-card border border-border">
            <p className="font-semibold text-foreground">Semibold (600)</p>
            <p className="text-xs text-muted-foreground">Subheadings, strong emphasis, button text</p>
          </div>
          <div className="p-3 rounded-lg bg-card border border-border">
            <p className="font-normal text-foreground">Regular (400)</p>
            <p className="text-xs text-muted-foreground">Body text, default content</p>
          </div>
          <div className="p-3 rounded-lg bg-card border border-border">
            <p className="font-medium text-foreground">Medium (500)</p>
            <p className="text-xs text-muted-foreground">Labels, secondary headings, emphasis in body</p>
          </div>
        </div>
      </div>

      {/* Practical Examples */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Practical Examples</h3>
        <div className="space-y-6 p-6 rounded-lg bg-card border border-border">
          <div>
            <p className="text-sm text-muted-foreground uppercase mb-2">Page Title</p>
            <p className="text-3xl font-bold text-foreground">Audit Governance Dashboard</p>
          </div>
          <div className="border-t border-border pt-4">
            <p className="text-sm text-muted-foreground uppercase mb-2">Card Heading</p>
            <p className="text-lg font-semibold text-foreground mb-2">Key Metrics</p>
            <p className="text-muted-foreground text-sm leading-relaxed">
              This is example body text that sits under a card heading. It uses a 16px size with 1.5 line-height for comfortable reading and visual hierarchy.
            </p>
          </div>
          <div className="border-t border-border pt-4">
            <p className="text-sm text-muted-foreground uppercase mb-2">Button & Label</p>
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold text-sm hover:bg-primary/90 transition-colors">
              Export Audit Report
            </button>
            <p className="text-xs text-muted-foreground mt-2">Inline help text with smaller font size</p>
          </div>
        </div>
      </div>

      {/* Guidelines */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Guidelines</h3>
        <div className="bg-green-900/10 border border-green-700/30 rounded-lg p-4">
          <p className="font-semibold text-green-600 mb-2">Best Practices</p>
          <ul className="text-sm text-green-700 space-y-1">
            <li>✓ Use text-balance on titles for better line breaks</li>
            <li>✓ Maintain consistent line-height within content blocks</li>
            <li>✓ Limit font size variations to improve visual coherence</li>
            <li>✓ Use semantic weight hierarchy: Bold &gt; Semibold &gt; Regular</li>
            <li>✓ Never go below 14px for body text on desktop</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default function SpacingLayout() {
  const spacingScale = [
    { value: '0', px: '0px', usage: 'No spacing' },
    { value: '1', px: '0.25rem (4px)', usage: 'Minimal spacing, icon offsets' },
    { value: '2', px: '0.5rem (8px)', usage: 'Tight spacing, component padding' },
    { value: '3', px: '0.75rem (12px)', usage: 'Small spacing, input fields' },
    { value: '4', px: '1rem (16px)', usage: 'Default spacing, padding, gaps' },
    { value: '6', px: '1.5rem (24px)', usage: 'Section spacing, card padding' },
    { value: '8', px: '2rem (32px)', usage: 'Large spacing, major sections' },
    { value: '12', px: '3rem (48px)', usage: 'Extra large spacing, page sections' },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-4">Spacing & Layout</h2>
        <p className="text-muted-foreground">
          Our layout system uses an 8px base grid for consistent, predictable spacing throughout the interface.
        </p>
      </div>

      {/* 8px Grid System */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">8px Base Grid</h3>
        <div className="p-6 rounded-lg bg-card border border-border">
          <p className="text-sm text-muted-foreground mb-4">All spacing values are multiples of 8px for visual harmony:</p>
          <div className="space-y-2">
            {spacingScale.map(item => (
              <div key={item.value} className="flex items-center gap-4 p-2 hover:bg-background rounded transition-colors">
                <div className="flex-shrink-0 w-20">
                  <span className="inline-block font-mono text-sm font-semibold text-accent">p-{item.value}</span>
                </div>
                <div className="flex-1">
                  <div
                    className="bg-accent rounded"
                    style={{ height: '16px', width: `${parseInt(item.px) * 2 || 4}px` }}
                  ></div>
                </div>
                <div className="w-32 text-right">
                  <span className="text-xs font-mono text-muted-foreground">{item.px}</span>
                </div>
                <div className="w-40 text-xs text-muted-foreground text-right">{item.usage}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Responsive Breakpoints */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Responsive Breakpoints</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { name: 'Mobile', breakpoint: 'base', width: 'Full width' },
            { name: 'Small', breakpoint: 'sm', width: '640px' },
            { name: 'Medium', breakpoint: 'md', width: '768px' },
            { name: 'Large', breakpoint: 'lg', width: '1024px' },
            { name: 'Extra Large', breakpoint: 'xl', width: '1280px' },
            { name: '2XL', breakpoint: '2xl', width: '1536px' },
          ].map(bp => (
            <div key={bp.breakpoint} className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground">{bp.name}</p>
              <p className="text-xs font-mono text-accent mt-1">{bp.breakpoint}</p>
              <p className="text-sm text-muted-foreground mt-2">{bp.width}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 p-4 rounded-lg bg-blue-900/10 border border-blue-700/30">
          <p className="text-sm font-semibold text-blue-600 mb-2">Mobile-First Approach</p>
          <p className="text-sm text-blue-700">Design for mobile first, then enhance with md:, lg:, xl: prefixes for larger screens</p>
        </div>
      </div>

      {/* Container Sizes */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Container Sizes</h3>
        <div className="space-y-3">
          {[
            { maxWidth: 'max-w-sm', px: '384px', usage: 'Narrow sidebars, small cards' },
            { maxWidth: 'max-w-md', px: '448px', usage: 'Forms, dialogs' },
            { maxWidth: 'max-w-lg', px: '512px', usage: 'Content areas, modals' },
            { maxWidth: 'max-w-2xl', px: '672px', usage: 'Standard content' },
            { maxWidth: 'max-w-4xl', px: '896px', usage: 'Design system (this page)' },
            { maxWidth: 'max-w-6xl', px: '1152px', usage: 'Full page content' },
          ].map(container => (
            <div key={container.maxWidth} className="p-3 rounded-lg bg-card border border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-foreground font-mono text-sm">{container.maxWidth}</p>
                  <p className="text-xs text-muted-foreground mt-1">{container.usage}</p>
                </div>
                <p className="text-xs font-mono text-accent">{container.px}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Layout Patterns */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Layout Patterns</h3>
        <div className="space-y-4">
          <div className="p-6 rounded-lg bg-card border border-border">
            <p className="font-semibold text-foreground mb-4">Flex for Most Layouts</p>
            <div className="flex gap-4 mb-3">
              <div className="flex-1 h-20 bg-primary/20 rounded-lg border border-primary/50 flex items-center justify-center">
                <span className="text-xs font-mono">flex-1</span>
              </div>
              <div className="flex-1 h-20 bg-primary/20 rounded-lg border border-primary/50 flex items-center justify-center">
                <span className="text-xs font-mono">flex-1</span>
              </div>
              <div className="flex-1 h-20 bg-primary/20 rounded-lg border border-primary/50 flex items-center justify-center">
                <span className="text-xs font-mono">flex-1</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Use flexbox (flex, gap, items-center, justify-between) for responsive layouts</p>
          </div>

          <div className="p-6 rounded-lg bg-card border border-border">
            <p className="font-semibold text-foreground mb-4">Grid for Complex 2D Layouts</p>
            <div className="grid grid-cols-3 gap-4 mb-3">
              {Array(6).fill(0).map((_, i) => (
                <div key={i} className="h-16 bg-accent/20 rounded-lg border border-accent/50"></div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">Use CSS Grid (grid-cols-3, gap-4) for multi-column layouts</p>
          </div>

          <div className="p-6 rounded-lg bg-card border border-border">
            <p className="font-semibold text-foreground mb-4">Stack Vertically (Flex Column)</p>
            <div className="space-y-3 mb-3">
              <div className="h-12 bg-muted/30 rounded-lg border border-muted/50"></div>
              <div className="h-12 bg-muted/30 rounded-lg border border-muted/50"></div>
              <div className="h-12 bg-muted/30 rounded-lg border border-muted/50"></div>
            </div>
            <p className="text-xs text-muted-foreground">Use space-y-* classes or flex flex-col for vertical stacking</p>
          </div>
        </div>
      </div>

      {/* Padding & Margin Usage */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Padding & Margin Usage</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-card border border-border">
            <p className="font-semibold text-foreground mb-3">Internal Spacing (Padding)</p>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Buttons: p-2 to p-3</li>
              <li>• Inputs: p-2 to p-3</li>
              <li>• Cards: p-4 to p-6</li>
              <li>• Sections: p-6 to p-8</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-card border border-border">
            <p className="font-semibold text-foreground mb-3">External Spacing (Margin)</p>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Between sections: my-12 to my-16</li>
              <li>• Between elements: mb-4 to mb-6</li>
              <li>• Gap between items: gap-4</li>
              <li>• Never use margin on components</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Safe Area Example */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Safe Area & Page Margins</h3>
        <div className="border-2 border-dashed border-muted p-4 rounded-lg">
          <div className="bg-card border border-border rounded-lg p-6 space-y-4">
            <div className="bg-primary/20 border border-primary/50 rounded p-4 text-sm text-foreground">
              max-w-4xl mx-auto (page container)
            </div>
            <div className="bg-accent/20 border border-accent/50 rounded p-4 text-sm text-foreground">
              px-4 sm:px-6 lg:px-8 (horizontal padding)
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Provides consistent margins at all screen sizes and prevents content from touching screen edges on mobile
            </p>
          </div>
        </div>
      </div>

      {/* Best Practices */}
      <div className="bg-green-900/10 border border-green-700/30 rounded-lg p-4">
        <p className="font-semibold text-green-600 mb-3">Layout Best Practices</p>
        <ul className="text-sm text-green-700 space-y-1">
          <li>✓ Use space-y-* and gap classes instead of margin on child elements</li>
          <li>✓ Stick to 8px multiples for all spacing (4, 8, 12, 16, 24, 32, 48, 64...)</li>
          <li>✓ Always use responsive padding: px-4 sm:px-6 lg:px-8</li>
          <li>✓ Prefer flex for alignment, grid for complex multi-column layouts</li>
          <li>✓ Never nest containers without considering the full layout chain</li>
        </ul>
      </div>
    </div>
  )
}

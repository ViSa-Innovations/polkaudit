'use client'

import { useState } from 'react'

export default function Motion() {
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-4">Motion & Transitions</h2>
        <p className="text-muted-foreground">
          Subtle, purposeful animations that enhance usability without distraction.
        </p>
      </div>

      {/* Animation Principles */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Motion Principles</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-card border border-border">
            <p className="font-semibold text-foreground mb-2">Purpose First</p>
            <p className="text-sm text-muted-foreground">Every animation should serve a purpose: provide feedback, guide attention, or smooth state changes.</p>
          </div>
          <div className="p-4 rounded-lg bg-card border border-border">
            <p className="font-semibold text-foreground mb-2">Keep It Fast</p>
            <p className="text-sm text-muted-foreground">Animations should be 200-500ms. Faster feels instantaneous, slower feels sluggish.</p>
          </div>
          <div className="p-4 rounded-lg bg-card border border-border">
            <p className="font-semibold text-foreground mb-2">Subtle & Refined</p>
            <p className="text-sm text-muted-foreground">Avoid obvious or exaggerated animations. Movement should be smooth and sophisticated.</p>
          </div>
          <div className="p-4 rounded-lg bg-card border border-border">
            <p className="font-semibold text-foreground mb-2">Respect Preferences</p>
            <p className="text-sm text-muted-foreground">Always respect prefers-reduced-motion for accessibility.</p>
          </div>
        </div>
      </div>

      {/* Common Transitions */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Common Transitions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Hover State */}
          <div className="space-y-3">
            <p className="text-sm font-semibold text-foreground">Button Hover</p>
            <button
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              className="w-full px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95 transition-all font-semibold text-sm"
            >
              Hover Me
            </button>
            <p className="text-xs text-muted-foreground font-mono">transition-all (color + scale)</p>
          </div>

          {/* Active State */}
          <div className="space-y-3">
            <p className="text-sm font-semibold text-foreground">Button Active</p>
            <button
              onClick={() => setClicked(!clicked)}
              className={`w-full px-4 py-2 rounded-lg transition-all font-semibold text-sm ${
                clicked
                  ? 'bg-accent text-accent-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-secondary'
              }`}
            >
              {clicked ? 'Clicked!' : 'Click Me'}
            </button>
            <p className="text-xs text-muted-foreground font-mono">active:scale-95</p>
          </div>

          {/* Fade In */}
          <div className="space-y-3">
            <p className="text-sm font-semibold text-foreground">Fade In</p>
            <div className="w-full h-12 rounded-lg bg-card border border-border animate-fade-in"></div>
            <p className="text-xs text-muted-foreground font-mono">opacity: 0 → 1 (300ms)</p>
          </div>

          {/* Slide In */}
          <div className="space-y-3">
            <p className="text-sm font-semibold text-foreground">Slide In</p>
            <div className="w-full h-12 rounded-lg bg-accent/20 border border-accent animate-slide-in"></div>
            <p className="text-xs text-muted-foreground font-mono">transform: translateX (300ms)</p>
          </div>

          {/* Scale */}
          <div className="space-y-3">
            <p className="text-sm font-semibold text-foreground">Scale (Focus)</p>
            <div className="flex justify-center">
              <div className="w-12 h-12 rounded-lg bg-primary/20 border border-primary focus-within:scale-110 focus-within:shadow-lg transition-all"></div>
            </div>
            <p className="text-xs text-muted-foreground font-mono">scale: 1 → 1.1 (200ms)</p>
          </div>

          {/* Color Transition */}
          <div className="space-y-3">
            <p className="text-sm font-semibold text-foreground">Color Transition</p>
            <div className="w-full h-12 rounded-lg bg-muted hover:bg-secondary transition-colors cursor-pointer"></div>
            <p className="text-xs text-muted-foreground font-mono">transition-colors (200ms)</p>
          </div>
        </div>
      </div>

      {/* Timing Guidelines */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Timing Guidelines</h3>
        <div className="space-y-3">
          {[
            { duration: '150ms', use: 'Quick feedback (hover, focus)' },
            { duration: '200ms', use: 'Color & opacity changes' },
            { duration: '300ms', use: 'Slide, scale, fade animations' },
            { duration: '500ms', use: 'Complex transitions, page layouts' },
            { duration: '1000ms+', use: 'Loading states, long operations' },
          ].map(item => (
            <div key={item.duration} className="flex items-center justify-between p-3 rounded-lg bg-card border border-border">
              <span className="font-mono font-semibold text-accent">{item.duration}</span>
              <span className="text-sm text-muted-foreground">{item.use}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Easing Functions */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Easing Functions</h3>
        <div className="space-y-4">
          {[
            { name: 'ease-in-out', description: 'Default, natural feeling' },
            { name: 'ease-out', description: 'Quick start, smooth end - for show/hide' },
            { name: 'ease-in', description: 'Slow start, quick end - less common' },
            { name: 'linear', description: 'Constant speed - use sparingly' },
          ].map(easing => (
            <div key={easing.name} className="p-4 rounded-lg bg-card border border-border">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono font-semibold text-accent">{easing.name}</span>
                <span className="text-xs text-muted-foreground">{easing.description}</span>
              </div>
              <div className="h-1 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full w-full bg-accent"
                  style={{
                    animation: `slideAnimation 2s ${easing.name} infinite`,
                  }}
                ></div>
              </div>
            </div>
          ))}
          <style>{`
            @keyframes slideAnimation {
              0% { transform: translateX(0); }
              50% { transform: translateX(100%); }
              100% { transform: translateX(0); }
            }
          `}</style>
        </div>
      </div>

      {/* CSS Examples */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Common CSS Patterns</h3>
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-background border border-border overflow-x-auto">
            <p className="text-xs font-semibold text-muted-foreground mb-2">Button Hover State</p>
            <pre className="text-xs text-foreground font-mono whitespace-pre-wrap break-words">
{`className="...
  hover:bg-primary/90
  transition-colors
  duration-200"`}
            </pre>
          </div>

          <div className="p-4 rounded-lg bg-background border border-border overflow-x-auto">
            <p className="text-xs font-semibold text-muted-foreground mb-2">Active State with Scale</p>
            <pre className="text-xs text-foreground font-mono whitespace-pre-wrap break-words">
{`className="...
  active:scale-95
  transition-transform
  duration-150"`}
            </pre>
          </div>

          <div className="p-4 rounded-lg bg-background border border-border overflow-x-auto">
            <p className="text-xs font-semibold text-muted-foreground mb-2">Focus State</p>
            <pre className="text-xs text-foreground font-mono whitespace-pre-wrap break-words">
{`className="...
  focus:outline-none
  focus:ring-2
  focus:ring-accent
  transition-all"`}
            </pre>
          </div>
        </div>
      </div>

      {/* Accessibility */}
      <div className="bg-blue-900/10 border border-blue-700/30 rounded-lg p-4">
        <p className="font-semibold text-blue-600 mb-2">Respecting Motion Preferences</p>
        <p className="text-sm text-blue-700 mb-3">Always respect the prefers-reduced-motion setting:</p>
        <div className="p-3 bg-background rounded border border-border overflow-x-auto">
          <pre className="text-xs text-foreground font-mono whitespace-pre-wrap break-words">
{`@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}`}
          </pre>
        </div>
      </div>

      {/* Best Practices */}
      <div className="bg-green-900/10 border border-green-700/30 rounded-lg p-4">
        <p className="font-semibold text-green-600 mb-3">Motion Best Practices</p>
        <ul className="text-sm text-green-700 space-y-1">
          <li>✓ Use transitions-all for hover/focus states</li>
          <li>✓ Keep animations under 500ms except for special cases</li>
          <li>✓ Use ease-in-out for most animations (feels natural)</li>
          <li>✓ Add transition-colors for color changes only</li>
          <li>✓ Use transform (scale, translateX) instead of width/height (better performance)</li>
          <li>✓ Always test with prefers-reduced-motion enabled</li>
        </ul>
      </div>
    </div>
  )
}

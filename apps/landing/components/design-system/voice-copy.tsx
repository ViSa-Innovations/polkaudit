export default function VoiceCopy() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-4">Voice & Copy Style</h2>
        <p className="text-muted-foreground">
          Guidelines for writing copy that resonates with our enterprise audience while remaining clear and actionable.
        </p>
      </div>

      {/* Tone Attributes */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Tone Attributes</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { attr: 'Professional', desc: 'We speak with expertise and authority' },
            { attr: 'Clear', desc: 'We explain complex topics simply' },
            { attr: 'Direct', desc: 'We get to the point without jargon' },
            { attr: 'Honest', desc: 'We avoid marketing hype and exaggeration' },
            { attr: 'Helpful', desc: 'We prioritize user success' },
            { attr: 'Confident', desc: 'We trust our product and expertise' },
          ].map(item => (
            <div key={item.attr} className="p-4 rounded-lg bg-card border border-border">
              <p className="font-semibold text-foreground">{item.attr}</p>
              <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Writing Principles */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Writing Principles</h3>
        <div className="space-y-4">
          {[
            {
              title: 'Use Active Voice',
              good: 'Export audit reports in seconds',
              bad: 'Audit reports can be exported quickly',
            },
            {
              title: 'Be Specific & Concrete',
              good: 'Track changes across 50+ governance parameters',
              bad: 'Monitor comprehensive governance data',
            },
            {
              title: 'Show the Benefit',
              good: 'Save 10 hours of manual audit work per report',
              bad: 'Automated audit report generation',
            },
            {
              title: 'Avoid Marketing Speak',
              good: 'Enterprise-grade security with encryption',
              bad: 'Industry-leading next-gen security solutions',
            },
            {
              title: 'Use Conversational Language',
              good: 'We help you track governance changes',
              bad: 'PolkAudit facilitates governance monitoring',
            },
          ].map(principle => (
            <div key={principle.title} className="p-4 rounded-lg bg-card border border-border">
              <p className="font-semibold text-foreground mb-3">{principle.title}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3 rounded bg-green-900/10 border border-green-700/30">
                  <p className="text-xs font-semibold text-green-600 uppercase mb-1">✓ Do</p>
                  <p className="text-sm text-green-700">{principle.good}</p>
                </div>
                <div className="p-3 rounded bg-red-900/10 border border-red-700/30">
                  <p className="text-xs font-semibold text-red-600 uppercase mb-1">✗ Don&apos;t</p>
                  <p className="text-sm text-red-700">{principle.bad}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Copy Examples */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Copy Examples</h3>

        <div className="space-y-4">
          {/* Headings */}
          <div className="p-6 rounded-lg bg-card border border-border">
            <p className="text-xs font-semibold text-muted-foreground uppercase mb-3">Hero Headline</p>
            <p className="text-2xl font-bold text-foreground mb-2">Track governance. Prove compliance. Scale confidently.</p>
            <p className="text-sm text-muted-foreground">Benefits-focused, action-oriented, punchy</p>
          </div>

          {/* Subheading */}
          <div className="p-6 rounded-lg bg-card border border-border">
            <p className="text-xs font-semibold text-muted-foreground uppercase mb-3">Subheading / Value Prop</p>
            <p className="text-lg text-foreground mb-2">Live finalized block indexing with comprehensive governance extraction</p>
            <p className="text-sm text-muted-foreground">Specific, technical, supports the main message</p>
          </div>

          {/* Button Copy */}
          <div className="p-6 rounded-lg bg-card border border-border">
            <p className="text-xs font-semibold text-muted-foreground uppercase mb-3">Call-to-Action Button</p>
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold text-sm hover:bg-primary/90 transition-colors">
              Start Free Audit
            </button>
            <p className="text-sm text-muted-foreground mt-3">Action-driven, benefit-focused, specific outcome</p>
          </div>

          {/* Error Message */}
          <div className="p-6 rounded-lg bg-card border border-border">
            <p className="text-xs font-semibold text-muted-foreground uppercase mb-3">Error Message</p>
            <div className="p-3 rounded bg-red-900/10 border border-red-700/30">
              <p className="text-sm text-red-600"><strong>Export failed:</strong> Please check your permissions and try again</p>
            </div>
            <p className="text-sm text-muted-foreground mt-3">Specific problem, actionable next step, empathetic tone</p>
          </div>

          {/* Help Text */}
          <div className="p-6 rounded-lg bg-card border border-border">
            <p className="text-xs font-semibold text-muted-foreground uppercase mb-3">Help Text / Hint</p>
            <p className="text-sm text-muted-foreground">We&apos;ll email you the audit report within 24 hours</p>
            <p className="text-sm text-muted-foreground mt-3">Clarifies what to expect, reduces uncertainty</p>
          </div>
        </div>
      </div>

      {/* UI Copy Patterns */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Common UI Copy Patterns</h3>
        <div className="space-y-3">
          {[
            { context: 'Navigation', example: 'Dashboard, Audits, Reports, Settings' },
            { context: 'Primary Button', example: 'Start Audit, Export Report, Save Changes' },
            { context: 'Secondary Button', example: 'Cancel, Go Back, Learn More' },
            { context: 'Confirmation', example: 'Are you sure? This action can&apos;t be undone.' },
            { context: 'Empty State', example: 'No audits yet. Create your first audit to get started.' },
            { context: 'Loading', example: 'Indexing blocks... This may take a few minutes.' },
            { context: 'Success', example: 'Audit exported successfully. Check your email.' },
          ].map(pattern => (
            <div key={pattern.context} className="p-3 rounded-lg bg-card border border-border">
              <p className="text-xs font-semibold text-accent uppercase mb-1">{pattern.context}</p>
              <p className="text-sm text-foreground">{pattern.example}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Terminology */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Preferred Terminology</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-card border-b border-border">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-foreground">Use</th>
                <th className="px-4 py-3 text-left font-semibold text-foreground">Instead of</th>
                <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Why</th>
              </tr>
            </thead>
            <tbody>
              {[
                { use: 'Audit', avoid: 'Scan, Analysis', reason: 'Our core service' },
                { use: 'Export', avoid: 'Download, Generate', reason: 'More precise action' },
                { use: 'Track', avoid: 'Monitor, Watch', reason: 'Active, engaged tone' },
                { use: 'Team', avoid: 'Organization, Account', reason: 'Familiar, human' },
                { use: 'Treasury', avoid: 'Budget, Funds', reason: 'Precise terminology' },
                { use: 'Governance', avoid: 'Parameters, Settings', reason: 'Specific domain' },
              ].map((term, idx) => (
                <tr key={idx} className="border-b border-border hover:bg-card transition-colors">
                  <td className="px-4 py-3 font-semibold text-foreground">{term.use}</td>
                  <td className="px-4 py-3 text-muted-foreground">{term.avoid}</td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{term.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Best Practices */}
      <div className="bg-green-900/10 border border-green-700/30 rounded-lg p-4">
        <p className="font-semibold text-green-600 mb-3">Copywriting Best Practices</p>
        <ul className="text-sm text-green-700 space-y-1">
          <li>✓ Use active voice and concrete verbs</li>
          <li>✓ Show benefits before features</li>
          <li>✓ Keep sentences short and scannable</li>
          <li>✓ Use second person (&quot;you&quot;) in CTAs</li>
          <li>✓ Be specific with numbers and details</li>
          <li>✓ Avoid jargon unless your audience expects it</li>
          <li>✓ Test copy for clarity and tone consistency</li>
        </ul>
      </div>
    </div>
  )
}

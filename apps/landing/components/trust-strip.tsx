import { Zap, FileText, Key, Cloud } from 'lucide-react'

export default function TrustStrip() {
  const trustItems = [
    {
      icon: Zap,
      label: 'Live Indexing',
      description: 'Real-time finalized block ingestion'
    },
    {
      icon: FileText,
      label: 'Audit Exports',
      description: 'CSV and JSON report generation'
    },
    {
      icon: Key,
      label: 'API Access',
      description: 'Key-based authenticated endpoints'
    },
    {
      icon: Cloud,
      label: 'Hybrid Deployment',
      description: 'Oracle, Neon, or Cloud Run options'
    }
  ]

  return (
    <section className="bg-card border-t border-border py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm font-medium text-accent uppercase tracking-wide">Trusted by Teams</p>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mt-2">
            Built for Treasury Teams, Grantees, Auditors, and Ecosystem Reviewers
          </h2>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {trustItems.map((item) => {
            const Icon = item.icon
            return (
              <div key={item.label} className="p-6 rounded-lg bg-background border border-border hover:border-accent/50 transition-colors text-center">
                <Icon className="w-8 h-8 text-accent mx-auto mb-4" />
                <h3 className="font-semibold text-foreground mb-2">{item.label}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

import { Database, BarChart3, Download, Lock, Globe } from 'lucide-react'

export default function Features() {
  const features = [
    {
      icon: Database,
      title: 'Live Finalized Block Indexing',
      description: 'Continuously index and process finalized blocks from the Polkadot chain with zero data loss.'
    },
    {
      icon: BarChart3,
      title: 'Governance & Treasury Extraction',
      description: 'Automatically extract and structure governance votes, treasury proposals, and spending activity.'
    },
    {
      icon: BarChart3,
      title: 'KPI Dashboard',
      description: 'Visual dashboards for treasury balance trends, proposal velocity, and governance participation metrics.'
    },
    {
      icon: Download,
      title: 'CSV & JSON Exports',
      description: 'Download comprehensive audit-ready reports in standard formats for compliance and analysis.'
    },
    {
      icon: Lock,
      title: 'API with Key-Based Access',
      description: 'Programmatic access to governance and treasury data with secure, rotatable API keys.'
    },
    {
      icon: Globe,
      title: 'Deployment Flexibility',
      description: 'Run on Oracle, Neon, or Google Cloud Run—choose the infrastructure that fits your needs.'
    }
  ]

  return (
    <section id="product" className="bg-background py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Core Product Features
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need for governance transparency and treasury accountability.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <div 
                key={feature.title}
                className="p-8 rounded-lg border border-border bg-card hover:border-accent/50 hover:bg-secondary/30 transition-all group"
              >
                <div className="mb-4">
                  <Icon className="w-10 h-10 text-accent group-hover:text-primary transition-colors" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

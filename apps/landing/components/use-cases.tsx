import { TrendingUp, CheckCircle, Search, Eye } from 'lucide-react'

export default function UseCases() {
  const useCases = [
    {
      icon: TrendingUp,
      title: 'Treasury Reporting',
      description: 'Automated monthly reports on treasury balance, spending patterns, and fund allocation to stakeholders.'
    },
    {
      icon: CheckCircle,
      title: 'Grantee Accountability',
      description: 'Track grant disbursements, milestones, and spending verification with auditable records.'
    },
    {
      icon: Search,
      title: 'Auditor Due Diligence',
      description: 'Comprehensive governance and financial data for third-party audits and compliance reviews.'
    },
    {
      icon: Eye,
      title: 'Ecosystem Intelligence',
      description: 'Understand governance trends and treasury health across the Polkadot ecosystem.'
    }
  ]

  return (
    <section id="use-cases" className="bg-card border-y border-border py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Use Cases
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Designed for diverse stakeholders in the Polkadot ecosystem.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {useCases.map((useCase) => {
            const Icon = useCase.icon
            return (
              <div 
                key={useCase.title}
                className="p-6 rounded-lg bg-background border border-border hover:border-accent/50 transition-colors"
              >
                <Icon className="w-8 h-8 text-accent mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {useCase.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {useCase.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

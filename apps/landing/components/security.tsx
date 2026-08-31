import { Lock, Eye, CheckCircle, Shield } from 'lucide-react'

export default function Security() {
  const securityPoints = [
    {
      icon: Lock,
      title: 'API Key Authentication',
      description: 'Secure, rotatable API keys with granular permission scopes.'
    },
    {
      icon: Eye,
      title: 'Environment-Based Secrets',
      description: 'All secrets managed via environment variables with no hardcoded credentials.'
    },
    {
      icon: CheckCircle,
      title: 'On-Chain Data Only',
      description: 'We index publicly available blockchain data. No private user information is collected or stored.'
    },
    {
      icon: Shield,
      title: 'Operational Monitoring',
      description: 'Continuous monitoring for data consistency, uptime, and security incidents.'
    }
  ]

  return (
    <section id="security" className="bg-card border-t border-border py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Security & Reliability
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Built on the principles of transparency and accountability that drive Polkadot.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {securityPoints.map((point) => {
            const Icon = point.icon
            return (
              <div 
                key={point.title}
                className="p-8 rounded-lg bg-background border border-border"
              >
                <Icon className="w-10 h-10 text-accent mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  {point.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {point.description}
                </p>
              </div>
            )
          })}
        </div>

        <div className="mt-12 p-8 rounded-lg bg-gradient-to-r from-accent/10 via-primary/5 to-background border border-border">
          <p className="text-center text-muted-foreground">
            Security documentation, deployment guidance, and operational runbooks are available for pilot and enterprise teams.
          </p>
        </div>
      </div>
    </section>
  )
}

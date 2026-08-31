import { ArrowRight } from 'lucide-react'
import { siteConfig } from '@/lib/site'

export default function CTABanner() {
  return (
    <section className="bg-gradient-to-r from-accent/10 via-primary/10 to-background border-t border-border py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
          Start with a Governance Audit Snapshot
        </h2>
        <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
          Get a comprehensive view of governance and treasury activity for your Polkadot team in minutes.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={`mailto:${siteConfig.links.contact}`}
            className="inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-lg bg-accent text-accent-foreground hover:bg-primary transition-colors"
          >
            Book Demo
            <ArrowRight className="ml-2 w-5 h-5" />
          </a>
          <a
            href={`mailto:${siteConfig.links.contact}?subject=PolkAudit%20Sales%20Inquiry`}
            className="inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-lg border border-border text-foreground hover:bg-secondary/50 transition-colors"
          >
            Contact Sales
          </a>
        </div>
      </div>
    </section>
  )
}

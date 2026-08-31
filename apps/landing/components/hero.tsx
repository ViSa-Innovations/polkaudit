import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { siteConfig } from '@/lib/site'

export default function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden bg-background py-20 md:py-32">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-b from-accent/20 via-accent/5 to-transparent rounded-full blur-3xl opacity-50" />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
              Governance Transparency for Polkadot Teams
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-2xl">
              Index finalized blocks in real time. Extract governance and treasury activity. Export comprehensive audit reports. Built for teams that need accountability and evidence.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a
                href={`mailto:${siteConfig.links.contact}`}
                className="inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-lg bg-accent text-accent-foreground hover:bg-primary transition-colors"
              >
                Book Demo
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
              <a
                href={siteConfig.links.dashboard}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-lg border border-border text-foreground hover:bg-secondary/50 transition-colors"
              >
                Open Live Dashboard
              </a>
            </div>
          </div>

          <div className="relative rounded-xl border border-border bg-card shadow-2xl shadow-accent/10 overflow-hidden ring-1 ring-white/5">
            <div className="flex items-center gap-2 border-b border-border bg-secondary/40 px-4 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" aria-hidden />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" aria-hidden />
              <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" aria-hidden />
              <span className="ml-2 text-xs font-mono text-muted-foreground truncate">
                demo.polkaudit.xyz — Overview
              </span>
            </div>
            <div className="relative aspect-[16/10] w-full">
              <Image
                src="/overview.png"
                alt="PolkAudit dashboard showing live blocks indexed, extrinsics, and governance KPIs"
                fill
                priority
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 560px"
              />
            </div>
            <div className="absolute bottom-3 right-3 rounded-full border border-accent/30 bg-background/90 px-3 py-1 text-xs font-medium text-accent backdrop-blur-sm">
              Live product screenshot
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

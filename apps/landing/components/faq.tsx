'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0)

  const faqs = [
    {
      q: 'Is this another Polkadot block explorer?',
      a: 'No. While explorers show transaction details, PolkAudit specializes in governance and treasury transparency. We extract and structure votes, proposals, treasury events, and spending patterns—not general transaction data.'
    },
    {
      q: 'Why are governance rows sometimes zero?',
      a: 'Governance rows populate only when matching OpenGov extrinsics are present in the indexed block range. During shorter windows you may see zero governance rows while total blocks and extrinsics still increase.'
    },
    {
      q: 'Is the data real-time?',
      a: 'We index finalized blocks within seconds of finalization. Finalized means irreversible on the Polkadot relay chain, ensuring data integrity for audit purposes.'
    },
    {
      q: 'Can we self-host?',
      a: 'Yes. For Enterprise customers, we provide containerized infrastructure (Docker + Neon) and deployment guidance for your own infrastructure.'
    },
    {
      q: 'Is this open source?',
      a: 'Yes. PolkAudit is open source under the Apache 2.0 license. Teams can self-host, while managed deployment and support are available for organizations that want a hosted option.'
    },
    {
      q: 'How do pilots work?',
      a: 'Most pilots run for 2-3 months with a fixed scope and discounted pricing. You get onboarding, shared success criteria, weekly check-ins, and a conversion option to Starter, Pro, or Enterprise.'
    }
  ]

  return (
    <section id="faq" className="bg-card border-t border-border py-20 md:py-32">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground">
            Common questions about PolkAudit and how it works.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div 
              key={idx}
              className="border border-border rounded-lg overflow-hidden bg-background hover:border-accent/50 transition-colors"
            >
              <button
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-secondary/30 transition-colors"
              >
                <h3 className="font-semibold text-foreground">
                  {faq.q}
                </h3>
                <ChevronDown 
                  className={`w-5 h-5 text-muted-foreground transition-transform flex-shrink-0 ${
                    openIdx === idx ? 'transform rotate-180' : ''
                  }`}
                />
              </button>
              
              {openIdx === idx && (
                <div className="px-6 py-4 bg-secondary/20 border-t border-border">
                  <p className="text-muted-foreground leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

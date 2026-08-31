'use client'

import { useEffect, useState } from 'react'
import { navItems, siteConfig } from '@/lib/site'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-background/95 backdrop-blur border-b border-border' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="text-xl font-bold tracking-tight text-foreground">
              PolkAudit
            </div>
            <nav className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <a key={item.href} href={item.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <a
              href={`mailto:${siteConfig.links.contact}`}
              className="hidden sm:inline-block px-4 py-2 text-sm font-medium rounded-lg border border-border text-foreground hover:bg-secondary transition-colors"
            >
              Book Demo
            </a>
            <a
              href={siteConfig.links.dashboard}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 text-sm font-medium rounded-lg bg-accent text-accent-foreground hover:bg-primary transition-colors"
            >
              View Live Demo
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}

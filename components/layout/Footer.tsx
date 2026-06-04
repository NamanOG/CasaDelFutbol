"use client"

import Link from "next/link"
import { FadeUp } from "@/components/motion/FadeUp"

const footerLinks = [
  {
    title: "Explore",
    links: [
      { label: "World Cup '26", href: "/world-cup" },
      { label: "Nations", href: "/nations" },
      { label: "Leagues", href: "/leagues" },
      { label: "Trophies", href: "/trophies" },
      { label: "Clubs", href: "/clubs" },
    ],
  },
  {
    title: "Learn",
    links: [
      { label: "Beginner Guide", href: "/guide" },
      { label: "Quiz Lab", href: "/quiz" },
    ],
  },
]

const socialLinks = [
  { label: "Match notes", href: "/guide" },
  { label: "World Cup hub", href: "/world-cup" },
  { label: "Quiz Lab", href: "/quiz" },
]

export const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer border-t border-hairline bg-surface mt-auto">
      <div className="container py-16 md:py-24">
        <FadeUp>
          <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
            <div className="space-y-6">
              <Link href="/" className="font-display uppercase tracking-widest text-3xl block text-text hover:text-accent transition-colors">
                Casa del Fútbol
              </Link>
              <p className="text-text-body text-sm max-w-sm leading-relaxed font-body">
                Football as culture, memory, and spectacle. Built to feel like matchday, not a spreadsheet.
              </p>
            </div>
            {footerLinks.map((group) => (
              <div key={group.title} className="space-y-6">
                <p className="eyebrow text-text-muted font-body font-semibold">{group.title}</p>
                <ul className="space-y-4">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="text-sm font-display tracking-wider text-text-muted hover:text-accent transition-colors uppercase">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="mt-16 flex flex-col gap-6 border-t border-hairline pt-8 md:flex-row md:items-center md:justify-between">
            <span className="font-body text-xs tracking-widest uppercase text-text-faint">
              &copy; {currentYear} Casa del Fútbol. All rights reserved.
            </span>
            <div className="flex flex-wrap gap-8 text-xs font-display uppercase tracking-[0.15em] text-text-muted">
              {socialLinks.map((link) => (
                <Link key={link.href} href={link.href} className="hover:text-accent transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </FadeUp>
      </div>
    </footer>
  )
}

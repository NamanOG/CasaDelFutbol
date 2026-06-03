"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { Menu, X } from "lucide-react"
import { ThemeSwitcher } from "./ThemeSwitcher"

const navLinks = [
  { label: "World Cup '26 🏆", href: "/world-cup", isSpecial: true },
  { label: "Nations", href: "/nations" },
  { label: "Leagues", href: "/leagues" },
  { label: "Trophies", href: "/trophies" },
  { label: "Clubs", href: "/clubs" },
  { label: "Guide", href: "/guide" },
  { label: "Quiz Lab", href: "/quiz" },
]

export const Navbar = () => {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  return (
    <>
      <nav className="site-nav">
        <Link href="/" className="site-nav__logo">
          Casa del Fútbol
        </Link>
        <ul className="site-nav__links hidden md:flex">
          {navLinks.map((link) => {
            const active = pathname === link.href || pathname.startsWith(`${link.href}/`)
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={link.isSpecial ? "site-nav__link--world-cup group/wc" : "site-nav__link"}
                >
                  {link.isSpecial ? (
                    <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider group-hover/wc:scale-105 transition-transform duration-300">
                      <svg className="w-4 h-4 text-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.6)] animate-bounce flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18 2H6v2H2v3c0 3.3 2.7 6 6 6h1.2c.8 1.6 2.3 2.8 4.1 3.2V19H9v2h6v-2h-4.3v-2.8c1.8-.4 3.3-1.6 4.1-3.2H16c3.3 0 6-2.7 6-6V4h-4V2zM8 9H4V7h4v2zm12-2v2h-4V7h4z" />
                      </svg>
                      <span className="bg-gradient-to-r from-amber-400 via-yellow-400 to-[#ffaa00] bg-clip-text text-transparent">
                        World Cup '26
                      </span>
                    </span>
                  ) : (
                    link.label
                  )}
                </Link>
              </li>
            )
          })}
          <li>
            <ThemeSwitcher />
          </li>
        </ul>
        <div className="flex items-center gap-3 md:hidden">
          <ThemeSwitcher />
          <button
            className="h-11 w-11 inline-flex items-center justify-center text-primary transition-colors hover:text-accent"
            onClick={() => setOpen((value) => !value)}
            aria-label="Menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: "0%" }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: "-100%" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[90] bg-canvas/95 backdrop-blur-xl pt-24"
          >
            <div className="container flex flex-col gap-8 h-full pb-24 overflow-y-auto">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 + 0.1, duration: 0.4 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={
                      link.isSpecial
                        ? "font-display text-5xl uppercase tracking-[0.05em] bg-gradient-to-r from-amber-400 to-[#ffaa00] bg-clip-text text-transparent transition-colors block"
                        : "font-display text-5xl uppercase tracking-[0.05em] text-primary hover:text-accent transition-colors block"
                    }
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

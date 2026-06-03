"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { Menu, X } from "lucide-react"
import { ThemeSwitcher } from "./ThemeSwitcher"

const navLinks = [
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
                  className="site-nav__link"
                >
                  {link.label}
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
                    className="font-display text-5xl uppercase tracking-[0.05em] text-primary hover:text-accent transition-colors block"
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

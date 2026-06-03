"use client"

import { useRef } from "react"
import { useReducedMotion } from "framer-motion"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import type { ReactNode } from "react"

gsap.registerPlugin(ScrollTrigger, useGSAP)

interface ScrollParallaxProps {
  children: ReactNode
  className?: string
  offset?: number
}

export const ScrollParallax = ({ children, className, offset = 120 }: ScrollParallaxProps) => {
  const ref = useRef<HTMLDivElement | null>(null)
  const prefersReducedMotion = useReducedMotion()

  useGSAP(
    () => {
      if (!ref.current || prefersReducedMotion) return

      gsap.fromTo(
        ref.current,
        { y: -offset, opacity: 0.6 },
        {
          y: offset,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      )
    },
    { scope: ref, dependencies: [prefersReducedMotion, offset] }
  )

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

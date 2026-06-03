"use client"

import { useEffect } from "react"
import { motion, useAnimationControls, useReducedMotion } from "framer-motion"

interface MarqueeProps {
  items: React.ReactNode[]
  className?: string
  reverse?: boolean
}

export function Marquee({ items, className, reverse = false }: MarqueeProps) {
  const controls = useAnimationControls()
  const prefersReducedMotion = useReducedMotion()
  const track = [...items, ...items, ...items]

  useEffect(() => {
    if (prefersReducedMotion) return
    controls.start({
      x: reverse ? ["-50%", "0%"] : ["0%", "-50%"],
      transition: { duration: 30, repeat: Infinity, ease: "linear" },
    })
  }, [controls, prefersReducedMotion, reverse])

  return (
    <div
      className={`overflow-hidden ${className ?? ""}`}
      onMouseEnter={() => controls.stop()}
      onMouseLeave={() =>
        prefersReducedMotion
          ? undefined
          : controls.start({
              x: reverse ? ["-50%", "0%"] : ["0%", "-50%"],
              transition: { duration: 30, repeat: Infinity, ease: "linear" },
            })
      }
    >
      <motion.div className="flex w-max whitespace-nowrap" animate={prefersReducedMotion ? { x: 0 } : controls}>
        {track.map((item, index) => (
          <div key={index} className="flex items-center justify-center px-8">
            {item}
          </div>
        ))}
      </motion.div>
    </div>
  )
}

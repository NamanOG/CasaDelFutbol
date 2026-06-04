"use client"

import type { ReactNode } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

interface HoverCardProps {
  children: ReactNode
  className?: string
}

export function HoverCard({ children, className }: HoverCardProps) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rx = useSpring(y, { stiffness: 220, damping: 30 })
  const ry = useSpring(x, { stiffness: 220, damping: 30 })

  return (
    <motion.div
      className={className}
      style={{
        rotateX: rx,
        rotateY: ry,
        transformStyle: "preserve-3d",
        boxShadow: "0 10px 30px var(--shadow-color)",
      }}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect()
        const px = (event.clientX - rect.left) / rect.width - 0.5
        const py = (event.clientY - rect.top) / rect.height - 0.5
        x.set(px * 12)
        y.set(py * -12)
      }}
      onMouseLeave={() => {
        x.set(0)
        y.set(0)
      }}
    >
      {children}
    </motion.div>
  )
}

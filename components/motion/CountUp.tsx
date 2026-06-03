"use client"

import { useEffect, useRef, useState } from "react"
import { useInView, useMotionValue, useSpring } from "framer-motion"

interface CountUpProps {
  target: number
  prefix?: string
  suffix?: string
  className?: string
}

export function CountUp({ target, prefix = "", suffix = "", className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-10px" })
  const mv = useMotionValue(0)
  const spring = useSpring(mv, { stiffness: 90, damping: 22, mass: 1 })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    const unsub = spring.on("change", (latest) => setDisplay(Math.round(latest)))
    return unsub
  }, [spring])

  useEffect(() => {
    if (isInView) mv.set(target)
  }, [isInView, mv, target])

  return (
    <span ref={ref} className={`font-mono tabular-nums ${className ?? ""}`}>
      {prefix}
      {display}
      {suffix}
    </span>
  )
}

"use client"

import { motion, type HTMLMotionProps, useReducedMotion } from "framer-motion"
import type { ReactNode } from "react"

interface FadeUpProps extends HTMLMotionProps<"div"> {
  children: ReactNode
  delay?: number
}

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1]

export function FadeUp({ children, delay = 0, className, ...rest }: FadeUpProps) {
  const prefersReducedMotion = useReducedMotion()
  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease, delay: prefersReducedMotion ? 0 : delay }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
}

export function StaggerContainer({ children, className }: { children: ReactNode; className?: string }) {
  const prefersReducedMotion = useReducedMotion()
  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  const prefersReducedMotion = useReducedMotion()
  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }
  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  )
}

export function ScaleIn({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease }}
    >
      {children}
    </motion.div>
  )
}

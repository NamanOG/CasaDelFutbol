"use client"

import { motion, useReducedMotion } from "framer-motion"
import { cn } from "@/lib/utils"

type RevealMode = "words" | "lines"
type RevealTag = "h1" | "h2" | "h3" | "p" | "span"

interface TextRevealProps {
  children: string
  className?: string
  tag?: RevealTag
  mode?: RevealMode
  delay?: number
  inView?: boolean
}

const easing: [number, number, number, number] = [0.16, 1, 0.3, 1]

export function TextReveal({
  children,
  className,
  tag = "h2",
  mode = "words",
  delay = 0,
  inView = false,
}: TextRevealProps) {
  const prefersReducedMotion = useReducedMotion()
  const Tag = tag
  const parts = mode === "lines" ? children.split("\n") : children.split(" ")

  if (prefersReducedMotion) {
    return <Tag className={className}>{children}</Tag>
  }

  return (
    <Tag className={className}>
      <motion.span
        initial="hidden"
        {...(inView
          ? { whileInView: "visible", viewport: { once: true, margin: "-60px" } }
          : { animate: "visible" })}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.05,
              delayChildren: delay,
            },
          },
        }}
        className={cn("flex flex-wrap", mode === "words" ? "gap-x-2 gap-y-1" : "gap-0")}
      >
        {parts.map((part, index) => (
          <span key={`${part}-${index}`} className="inline-block overflow-hidden">
            <motion.span
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.55, ease: easing },
                },
              }}
              className="inline-block will-change-transform"
            >
              {part}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  )
}

export function TextRevealOnScroll(props: Omit<TextRevealProps, "inView">) {
  return <TextReveal {...props} inView />
}

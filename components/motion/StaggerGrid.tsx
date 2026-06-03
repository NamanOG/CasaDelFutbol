"use client"

import type { ReactNode } from "react"
import { FadeUp } from "@/components/motion/FadeUp"

interface StaggerGridProps {
  className?: string
  children: ReactNode[]
}

export function StaggerGrid({ className, children }: StaggerGridProps) {
  return (
    <div className={className}>
      {children.map((child, index) => (
        <FadeUp key={index} delay={index * 0.07}>
          {child}
        </FadeUp>
      ))}
    </div>
  )
}

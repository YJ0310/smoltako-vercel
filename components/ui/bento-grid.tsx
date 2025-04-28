"use client"

import type { ReactNode } from "react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface BentoGridProps {
  children: ReactNode
  className?: string
  gap?: "none" | "sm" | "md" | "lg"
}

export function BentoGrid({ children, className, gap = "md" }: BentoGridProps) {
  const gapClasses = {
    none: "gap-0",
    sm: "gap-2",
    md: "gap-4",
    lg: "gap-8",
  }

  return <div className={cn("bento-grid", gapClasses[gap], className)}>{children}</div>
}

interface BentoItemProps {
  children: ReactNode
  className?: string
  colSpan?: 1 | 2 | 3 | 4
  rowSpan?: 1 | 2 | 3 | 4
  highlight?: boolean
}

export function BentoItem({ children, className, colSpan = 1, rowSpan = 1, highlight = false }: BentoItemProps) {
  const colSpanClasses = {
    1: "md:col-span-1",
    2: "md:col-span-2",
    3: "md:col-span-3",
    4: "md:col-span-4",
  }

  const rowSpanClasses = {
    1: "md:row-span-1",
    2: "md:row-span-2",
    3: "md:row-span-3",
    4: "md:row-span-4",
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: "-100px" }}
      className={cn(
        "bento-item rounded-xl overflow-hidden",
        colSpanClasses[colSpan],
        rowSpanClasses[rowSpan],
        highlight ? "ring-2 ring-primary" : "ring-1 ring-border",
        className,
      )}
    >
      {children}
    </motion.div>
  )
}

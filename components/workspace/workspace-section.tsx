"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface WorkspaceSectionProps {
  title: string
  description?: string
  children: ReactNode
}

export function WorkspaceSection({ title, description, children }: WorkspaceSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
        {description && <p className="text-muted-foreground">{description}</p>}
      </div>
      <div>{children}</div>
    </motion.section>
  )
}

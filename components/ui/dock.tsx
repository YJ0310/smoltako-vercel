"use client"

import type { ReactNode } from "react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface DockProps {
  children: ReactNode
  className?: string
  position?: "bottom" | "top" | "left" | "right"
}

export function Dock({ children, className, position = "bottom" }: DockProps) {
  const positionClasses = {
    bottom: "fixed bottom-4 left-1/2 -translate-x-1/2 flex-row",
    top: "fixed top-4 left-1/2 -translate-x-1/2 flex-row",
    left: "fixed left-4 top-1/2 -translate-y-1/2 flex-col",
    right: "fixed right-4 top-1/2 -translate-y-1/2 flex-col",
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: position === "top" ? -20 : position === "bottom" ? 20 : 0,
        x: position === "left" ? -20 : position === "right" ? 20 : 0,
      }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "dock flex z-50 p-3 rounded-full bg-background/80 backdrop-blur-md border border-border shadow-lg",
        positionClasses[position],
        className,
      )}
    >
      {children}
    </motion.div>
  )
}

interface DockItemProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  tooltip?: string
}

export function DockItem({ children, className, onClick, tooltip }: DockItemProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.2, y: -10 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "dock-item relative flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 cursor-pointer",
        className,
      )}
      onClick={onClick}
    >
      {children}
      {tooltip && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileHover={{ opacity: 1, y: 0 }}
          className="absolute -top-10 px-2 py-1 bg-popover text-popover-foreground text-xs rounded shadow whitespace-nowrap"
        >
          {tooltip}
        </motion.div>
      )}
    </motion.div>
  )
}

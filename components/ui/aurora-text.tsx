"use client"

import { useState, useEffect, type ReactNode } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface AuroraTextProps {
  children: ReactNode
  className?: string
  baseColor?: string
  glowColor?: string
  duration?: number
  delay?: number
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span"
}

export function AuroraText({
  children,
  className,
  baseColor = "text-primary",
  glowColor = "purple",
  duration = 8,
  delay = 0,
  as: Component = "span",
}: AuroraTextProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <Component className={cn(baseColor, className)}>{children}</Component>
  }

  return (
    <motion.div
      className="relative inline-block"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay }}
    >
      <Component className={cn("relative z-10", baseColor, className)}>{children}</Component>

      <motion.div
        className="absolute inset-0 -z-10 blur-xl opacity-70"
        style={{
          background: `linear-gradient(90deg, ${glowColor}, #3c294d, ${glowColor})`,
          backgroundSize: "200% 100%",
        }}
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />
    </motion.div>
  )
}

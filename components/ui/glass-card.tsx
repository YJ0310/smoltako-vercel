"use client"

import { cn } from "@/lib/utils"
import { motion, type MotionProps } from "framer-motion"
import type { ReactNode } from "react"

interface GlassCardProps extends MotionProps {
  children: ReactNode
  className?: string
  intensity?: "light" | "medium" | "heavy"
  color?: "primary" | "secondary" | "accent" | "neutral"
  hoverEffect?: boolean
  border?: boolean
}

export function GlassCard({
  children,
  className,
  intensity = "medium",
  color = "primary",
  hoverEffect = true,
  border = true,
  ...motionProps
}: GlassCardProps) {
  const intensityMap = {
    light: "bg-opacity-10 backdrop-blur-sm",
    medium: "bg-opacity-20 backdrop-blur-md",
    heavy: "bg-opacity-30 backdrop-blur-lg",
  }

  const colorMap = {
    primary: "bg-primary/10 border-primary/20",
    secondary: "bg-secondary/20 border-secondary/30",
    accent: "bg-accent/10 border-accent/20",
    neutral: "bg-background/30 border-border/30",
  }

  return (
    <motion.div
      className={cn(
        "rounded-xl",
        intensityMap[intensity],
        colorMap[color],
        border ? "border" : "",
        hoverEffect ? "hover:shadow-lg hover:-translate-y-1 transition-all duration-300" : "",
        className,
      )}
      {...motionProps}
    >
      {children}
    </motion.div>
  )
}

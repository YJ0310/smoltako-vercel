"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface MagicTextProps {
  children: ReactNode
  className?: string
  effect?: "gradient" | "shimmer" | "glow" | "highlight"
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span"
  delay?: number
}

export function MagicText({ children, className, effect = "gradient", as = "span", delay = 0 }: MagicTextProps) {
  const effectStyles = {
    gradient: "bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400",
    shimmer:
      "bg-clip-text text-transparent bg-[linear-gradient(110deg,#e2e8f0,45%,#1e293b,55%,#e2e8f0)] bg-[length:250%_100%] dark:bg-[linear-gradient(110deg,#1e293b,45%,#e2e8f0,55%,#1e293b)]",
    glow: "text-primary drop-shadow-[0_0_10px_rgba(124,58,237,0.5)]",
    highlight:
      "relative after:absolute after:bottom-0 after:left-0 after:h-[8px] after:w-full after:bg-primary/30 after:-z-10",
  }

  const Component = motion[as]

  const shimmerAnimation = {
    initial: { backgroundPosition: "-500px 0" },
    animate: {
      backgroundPosition: ["500px 0", "0 0"],
      transition: {
        duration: 3,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "mirror",
        delay,
      },
    },
  }

  return (
    <Component
      className={cn(effectStyles[effect], className)}
      {...(effect === "shimmer"
        ? shimmerAnimation
        : {
            initial: { opacity: 0, y: 20 },
            animate: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.5,
                delay,
              },
            },
          })}
    >
      {children}
    </Component>
  )
}

"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface MagicButtonProps {
  children: ReactNode
  className?: string
  effect?: "glow" | "gradient" | "pulse" | "shine"
  onClick?: () => void
  disabled?: boolean
  type?: "button" | "submit" | "reset"
  asChild?: boolean
}

export function MagicButton({
  children,
  className,
  effect = "glow",
  onClick,
  disabled = false,
  type = "button",
  asChild = false,
}: MagicButtonProps) {
  const effectStyles = {
    glow: "bg-primary hover:shadow-[0_0_15px_rgba(124,58,237,0.5)] transition-shadow duration-300",
    gradient:
      "bg-gradient-to-r from-primary to-purple-400 hover:from-purple-400 hover:to-primary transition-all duration-300",
    pulse: "bg-primary",
    shine: "bg-primary relative overflow-hidden",
  }

  const pulseAnimation = {
    initial: {},
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "loop",
      },
    },
  }

  const shineAnimation = {
    initial: {},
    animate: {},
    whileHover: {
      "&::before": {
        left: "100%",
      },
    },
  }

  const Component = asChild ? motion.div : motion.button

  return (
    <Component
      type={!asChild ? type : undefined}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "px-6 py-3 rounded-full text-white font-medium",
        effectStyles[effect],
        effect === "shine"
          ? 'before:absolute before:content-[""] before:top-0 before:left-[-100%] before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent before:transition-all before:duration-700 hover:before:left-[100%]'
          : "",
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
        className,
      )}
      {...(effect === "pulse" ? pulseAnimation : {})}
      {...(effect === "shine" ? shineAnimation : {})}
    >
      {children}
    </Component>
  )
}

"use client"

import { cn } from "@/lib/utils"
import { motion, useMotionTemplate, useMotionValue } from "framer-motion"
import type { MouseEvent, ReactNode } from "react"

interface MagicCardProps {
  children: ReactNode
  className?: string
  effect?: "tilt" | "glow" | "border" | "spotlight"
}

export function MagicCard({ children, className, effect = "tilt" }: MagicCardProps) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const { currentTarget, clientX, clientY } = e
    const { left, top, width, height } = currentTarget.getBoundingClientRect()

    mouseX.set(clientX - left)
    mouseY.set(clientY - top)

    if (effect === "tilt") {
      const x = (clientX - left - width / 2) / 25
      const y = (clientY - top - height / 2) / 25
      currentTarget.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`
    }
  }

  const handleMouseLeave = (e: MouseEvent<HTMLDivElement>) => {
    if (effect === "tilt") {
      e.currentTarget.style.transform = "rotateY(0deg) rotateX(0deg)"
    }
  }

  const spotlightX = useMotionTemplate`${mouseX}px`
  const spotlightY = useMotionTemplate`${mouseY}px`

  return (
    <motion.div
      className={cn(
        "rounded-xl overflow-hidden relative transition-all duration-200",
        effect === "border" ? "p-[1px] bg-gradient-to-r from-primary/50 to-purple-400/50" : "",
        effect === "spotlight" ? "group" : "",
        className,
      )}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={effect === "tilt" ? { perspective: "1000px", transformStyle: "preserve-3d" } : undefined}
    >
      {effect === "glow" && (
        <div className="absolute inset-0 -z-10 bg-primary/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
      )}

      {effect === "spotlight" && (
        <div
          className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(300px circle at ${spotlightX} ${spotlightY}, rgba(124,58,237,0.15), transparent 80%)`,
          }}
        />
      )}

      {effect === "border" ? (
        <div className="bg-background rounded-[calc(0.75rem-1px)] p-6 h-full">{children}</div>
      ) : (
        children
      )}
    </motion.div>
  )
}

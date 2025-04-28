"use client"

import type React from "react"

import { useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

interface CursorSpotlightProps {
  children: React.ReactNode
  size?: number
  color?: string
  blur?: number
  opacity?: number
  className?: string
}

export function CursorSpotlight({
  children,
  size = 300,
  color = "rgba(124, 58, 237, 0.15)",
  blur = 40,
  opacity = 0.2,
  className,
}: CursorSpotlightProps) {
  const [isHovered, setIsHovered] = useState(false)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 20, stiffness: 200 }
  const spotlightX = useSpring(mouseX, springConfig)
  const spotlightY = useSpring(mouseY, springConfig)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }

  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}

      {isHovered && (
        <motion.div
          className="pointer-events-none absolute -inset-px z-10"
          style={{
            background: `radial-gradient(${size}px circle at ${spotlightX}px ${spotlightY}px, ${color}, transparent)`,
            opacity,
          }}
        />
      )}
    </motion.div>
  )
}

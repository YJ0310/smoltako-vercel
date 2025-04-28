"use client"

import { motion, useScroll, useSpring } from "framer-motion"

interface ScrollProgressProps {
  color?: string
  height?: number
  position?: "top" | "bottom"
}

export function ScrollProgress({ color = "bg-primary", height = 4, position = "top" }: ScrollProgressProps) {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      className={`fixed left-0 right-0 ${position === "top" ? "top-0" : "bottom-0"} ${color} origin-left z-50`}
      style={{
        scaleX,
        height: `${height}px`,
      }}
    />
  )
}

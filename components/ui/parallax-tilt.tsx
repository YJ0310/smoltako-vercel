"use client"

import { useState, useRef, type ReactNode, type MouseEvent } from "react"
import { motion, useSpring } from "framer-motion"
import { cn } from "@/lib/utils"

interface ParallaxTiltProps {
  children: ReactNode
  className?: string
  scale?: number
  rotationIntensity?: number
  moveIntensity?: number
  perspective?: number
  glareEnable?: boolean
  glareMaxOpacity?: number
  glareColor?: string
  glarePosition?: "all" | "top" | "right" | "bottom" | "left"
  glareBorderRadius?: string
}

export function ParallaxTilt({
  children,
  className,
  scale = 1.05,
  rotationIntensity = 20,
  moveIntensity = 20,
  perspective = 800,
  glareEnable = false,
  glareMaxOpacity = 0.2,
  glareColor = "white",
  glarePosition = "all",
  glareBorderRadius = "0px",
}: ParallaxTiltProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mouseEntered, setMouseEntered] = useState(false)
  const [mouseGlarePosition, setMouseGlarePosition] = useState({ x: 0, y: 0 })

  const springConfig = { stiffness: 150, damping: 25, mass: 0.5 }

  const rotateX = useSpring(0, springConfig)
  const rotateY = useSpring(0, springConfig)
  const transformX = useSpring(0, springConfig)
  const transformY = useSpring(0, springConfig)

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()

    // Calculate mouse position relative to the container
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const mouseX = e.clientX - centerX
    const mouseY = e.clientY - centerY

    // Calculate rotation based on mouse position
    const rotateXValue = (mouseY / (rect.height / 2)) * -rotationIntensity
    const rotateYValue = (mouseX / (rect.width / 2)) * rotationIntensity

    // Calculate transform based on mouse position
    const transformXValue = (mouseX / (rect.width / 2)) * moveIntensity
    const transformYValue = (mouseY / (rect.height / 2)) * moveIntensity

    // Update spring values
    rotateX.set(rotateXValue)
    rotateY.set(rotateYValue)
    transformX.set(transformXValue)
    transformY.set(transformYValue)

    // Update glare position
    if (glareEnable) {
      const glareX = (mouseX / rect.width) * 100
      const glareY = (mouseY / rect.height) * 100
      setMouseGlarePosition({ x: glareX, y: glareY })
    }
  }

  const handleMouseEnter = () => {
    setMouseEntered(true)
  }

  const handleMouseLeave = () => {
    setMouseEntered(false)
    rotateX.set(0)
    rotateY.set(0)
    transformX.set(0)
    transformY.set(0)
  }

  const glarePositionStyle = () => {
    if (glarePosition === "all") return {}

    const styles: Record<string, string> = {
      top: "bottom: 0; height: 200%; left: 0; right: 0;",
      right: "left: 0; width: 200%; top: 0; bottom: 0;",
      bottom: "top: 0; height: 200%; left: 0; right: 0;",
      left: "right: 0; width: 200%; top: 0; bottom: 0;",
    }

    return { style: styles[glarePosition] }
  }

  return (
    <motion.div
      ref={containerRef}
      className={cn("relative overflow-hidden", className)}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: `${perspective}px`,
        transformStyle: "preserve-3d",
      }}
      whileHover={{ scale }}
    >
      <motion.div
        style={{
          rotateX: rotateX,
          rotateY: rotateY,
          translateX: transformX,
          translateY: transformY,
          transformStyle: "preserve-3d",
        }}
      >
        {children}

        {glareEnable && mouseEntered && (
          <div
            className="absolute inset-0 overflow-hidden pointer-events-none"
            style={{ borderRadius: glareBorderRadius }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              {...glarePositionStyle()}
              style={{
                background: `radial-gradient(circle at ${mouseGlarePosition.x}% ${mouseGlarePosition.y}%, ${glareColor} 0%, transparent 80%)`,
                opacity: glareMaxOpacity,
              }}
            />
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}

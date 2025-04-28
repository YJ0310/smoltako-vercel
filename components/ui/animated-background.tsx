"use client"

import { useState, useEffect, type ReactNode } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface AnimatedBackgroundProps {
  children: ReactNode
  className?: string
  images: string[]
  interval?: number
  overlayOpacity?: number
  blurAmount?: number
  transitionDuration?: number
}

export function AnimatedBackground({
  children,
  className,
  images,
  interval = 8000,
  overlayOpacity = 0.7,
  blurAmount = 8,
  transitionDuration = 1.5,
}: AnimatedBackgroundProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Set initial visibility after a short delay
    const initialTimer = setTimeout(() => {
      setIsVisible(true)
    }, 100)

    // Set up interval for image rotation
    const intervalTimer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, interval)

    return () => {
      clearTimeout(initialTimer)
      clearInterval(intervalTimer)
    }
  }, [images.length, interval])

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentImageIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: transitionDuration, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full"
        >
          <Image
            src={images[currentImageIndex] || "/placeholder.svg"}
            alt="Background"
            fill
            className="object-cover"
            priority
          />
        </motion.div>
      </AnimatePresence>

      {/* Overlay with blur effect */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})`,
          backdropFilter: `blur(${blurAmount}px)`,
        }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}

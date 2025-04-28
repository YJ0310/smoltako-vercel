"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface InteractiveImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  imageClassName?: string
  priority?: boolean
  effect?: "scale" | "rotate" | "shine" | "pulse" | "tilt" | "none"
  intensity?: "low" | "medium" | "high"
}

export function InteractiveImage({
  src,
  alt,
  width,
  height,
  className,
  imageClassName,
  priority = false,
  effect = "scale",
  intensity = "medium",
}: InteractiveImageProps) {
  const [isHovered, setIsHovered] = useState(false)

  // Set intensity values based on the selected level
  const intensityValues = {
    low: {
      scale: 1.03,
      rotate: 3,
      tilt: 5,
    },
    medium: {
      scale: 1.05,
      rotate: 5,
      tilt: 10,
    },
    high: {
      scale: 1.1,
      rotate: 10,
      tilt: 15,
    },
  }

  const getAnimationProps = () => {
    const intensityValue = intensityValues[intensity]

    switch (effect) {
      case "scale":
        return {
          whileHover: { scale: intensityValue.scale },
          transition: { type: "spring", stiffness: 300, damping: 20 },
        }
      case "rotate":
        return {
          whileHover: { rotate: [0, -intensityValue.rotate, intensityValue.rotate, 0], transition: { duration: 0.5 } },
        }
      case "shine":
        return {}
      case "pulse":
        return {
          animate: isHovered
            ? { scale: [1, intensityValue.scale, 1], transition: { repeat: Number.POSITIVE_INFINITY, duration: 1.5 } }
            : { scale: 1 },
        }
      case "tilt":
        return {
          whileHover: {
            rotateX: intensityValue.tilt,
            rotateY: intensityValue.tilt,
            transition: { duration: 0.3 },
          },
        }
      default:
        return {}
    }
  }

  return (
    <motion.div
      className={cn("relative overflow-hidden", className)}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      {...getAnimationProps()}
    >
      <Image
        src={src || "/placeholder.svg"}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        className={cn("transition-transform duration-300", imageClassName)}
      />

      {effect === "shine" && isHovered && (
        <motion.div
          className="absolute inset-0 z-10 pointer-events-none"
          initial={{ x: "-100%", opacity: 0.5 }}
          animate={{ x: "200%" }}
          transition={{ duration: 1, ease: "easeInOut" }}
          style={{
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
          }}
        />
      )}
    </motion.div>
  )
}

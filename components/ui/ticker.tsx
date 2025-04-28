"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import { useAnimationFrame } from "framer-motion"
import { cn } from "@/lib/utils"

interface TickerProps {
  children: React.ReactNode
  direction?: "left" | "right"
  speed?: number
  className?: string
}

export function Ticker({ children, direction = "left", speed = 20, className }: TickerProps) {
  const [isPaused, setIsPaused] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState(0)
  const [contentWidth, setContentWidth] = useState(0)
  const [containerWidth, setContainerWidth] = useState(0)

  // Calculate dimensions
  useEffect(() => {
    if (!innerRef.current || !containerRef.current) return

    const calculateDimensions = () => {
      if (innerRef.current && containerRef.current) {
        setContentWidth(innerRef.current.offsetWidth)
        setContainerWidth(containerRef.current.offsetWidth)
      }
    }

    calculateDimensions()
    window.addEventListener("resize", calculateDimensions)

    return () => {
      window.removeEventListener("resize", calculateDimensions)
    }
  }, [children])

  // Animation frame
  useAnimationFrame((_, delta) => {
    if (isPaused || !contentWidth) return

    const pixelsPerSecond = speed
    const pixelsToMove = (pixelsPerSecond * delta) / 1000

    if (direction === "left") {
      setPosition((prev) => {
        // Reset position when content has scrolled completely out of view
        if (prev <= -contentWidth) {
          return 0
        }
        return prev - pixelsToMove
      })
    } else {
      setPosition((prev) => {
        // Reset position when content has scrolled completely into view
        if (prev >= 0) {
          return -contentWidth
        }
        return prev + pixelsToMove
      })
    }
  })

  return (
    <div
      ref={containerRef}
      className={cn("overflow-hidden", className)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative flex whitespace-nowrap">
        <div
          ref={innerRef}
          className="flex items-center"
          style={{
            transform: `translateX(${position}px)`,
            transition: isPaused ? "transform 0.1s ease" : "none",
          }}
        >
          {children}
        </div>
        <div
          className="flex items-center absolute left-0"
          style={{
            transform: `translateX(${position + contentWidth}px)`,
            transition: isPaused ? "transform 0.1s ease" : "none",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

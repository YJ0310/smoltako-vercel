"use client"

import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface MarqueeProps {
  children: ReactNode
  className?: string
  direction?: "left" | "right"
  speed?: "slow" | "normal" | "fast"
  pauseOnHover?: boolean
}

export function Marquee({
  children,
  className,
  direction = "left",
  speed = "normal",
  pauseOnHover = true,
}: MarqueeProps) {
  const speedClass = {
    slow: "animate-marquee [animation-duration:40s]",
    normal: "animate-marquee [animation-duration:25s]",
    fast: "animate-marquee [animation-duration:15s]",
  }

  return (
    <div className={cn("relative flex overflow-hidden", className)}>
      <div
        className={cn(
          "flex min-w-full shrink-0 items-center justify-around gap-4",
          direction === "right" ? "animate-marquee-reverse" : "animate-marquee",
          speedClass[speed],
          pauseOnHover && "hover:[animation-play-state:paused]",
        )}
      >
        {children}
      </div>
      <div
        className={cn(
          "flex min-w-full shrink-0 items-center justify-around gap-4",
          direction === "right" ? "animate-marquee-reverse" : "animate-marquee",
          speedClass[speed],
          pauseOnHover && "hover:[animation-play-state:paused]",
        )}
      >
        {children}
      </div>
    </div>
  )
}

"use client"

import type React from "react"

import { useEffect, useState } from "react"
import Image from "next/image"
import { useTheme } from "next-themes"

interface FrostedBackgroundProps {
  children: React.ReactNode
}

export function FrostedBackground({ children }: FrostedBackgroundProps) {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <>{children}</>
  }

  return (
    <div className="relative min-h-screen">
      {/* Background image with extreme frosting */}
      <div className="fixed inset-0 z-[-1]">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/background-OqTuau7xbgNsGQrvwxVrG4NTohSj5i.png"
          alt="Background"
          fill
          className="object-cover opacity-[0.03] dark:opacity-[0.02]"
          priority
        />
        <div
          className="absolute inset-0 backdrop-blur-[100px]"
          style={{
            backgroundColor: theme === "dark" ? "rgba(10, 10, 10, 0.97)" : "rgba(255, 255, 255, 0.97)",
          }}
        />
      </div>

      {/* Content */}
      {children}
    </div>
  )
}

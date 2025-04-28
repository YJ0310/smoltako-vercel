"use client"

import { type ReactNode, useEffect } from "react"
import { useTheme } from "next-themes"

interface ThemeTransitionProps {
  children: ReactNode
}

export function ThemeTransition({ children }: ThemeTransitionProps) {
  const { theme, resolvedTheme } = useTheme()

  useEffect(() => {
    document.documentElement.classList.add("theme-transition")

    return () => {
      document.documentElement.classList.remove("theme-transition")
    }
  }, [])

  useEffect(() => {
    // Add a flash animation when theme changes
    if (theme === "dark" || resolvedTheme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [theme, resolvedTheme])

  return <>{children}</>
}

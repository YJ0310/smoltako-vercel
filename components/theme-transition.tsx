"use client"

import { type ReactNode, useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "framer-motion"

interface ThemeTransitionProps {
  children: ReactNode
}

export function ThemeTransition({ children }: ThemeTransitionProps) {
  const { theme, resolvedTheme } = useTheme()
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    setIsTransitioning(true)

    // Add transition class to document
    document.documentElement.classList.add("theme-transitioning")

    const timer = setTimeout(() => {
      setIsTransitioning(false)
      document.documentElement.classList.remove("theme-transitioning")
    }, 500)

    return () => {
      clearTimeout(timer)
      document.documentElement.classList.remove("theme-transitioning")
    }
  }, [theme, resolvedTheme, mounted])

  if (!mounted) {
    return <>{children}</>
  }

  return (
    <>
      {children}

      {/* Theme transition overlay */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            className="fixed inset-0 z-[9999] pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Ripple effect from center */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  theme === "dark"
                    ? "radial-gradient(circle, hsl(var(--background)) 0%, transparent 70%)"
                    : "radial-gradient(circle, hsl(var(--background)) 0%, transparent 70%)",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
              }}
              initial={{ scale: 0, opacity: 0.8 }}
              animate={{ scale: 3, opacity: 0 }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
              }}
            />

            {/* Smooth color overlay */}
            <motion.div
              className="absolute inset-0"
              style={{
                backgroundColor: theme === "dark" ? "hsl(var(--background))" : "hsl(var(--background))",
              }}
              initial={{ opacity: 0.3 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

"use client"

import { useTheme } from "next-themes"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { Sun, Moon } from "lucide-react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const isDark = theme === "dark"

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark")
  }

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative inline-flex h-8 w-14 items-center rounded-full bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      whileTap={{ scale: 0.95 }}
    >
      {/* Toggle background */}
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{
          backgroundColor: isDark ? "hsl(var(--primary))" : "hsl(var(--muted))",
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Toggle circle */}
      <motion.div
        className="relative inline-block h-6 w-6 transform rounded-full bg-background shadow-lg ring-0 transition-transform"
        animate={{
          x: isDark ? 28 : 4,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
        }}
      >
        {/* Icons */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{
            opacity: isDark ? 0 : 1,
            rotate: isDark ? 180 : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          <Sun className="h-3 w-3 text-yellow-500" />
        </motion.div>

        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{
            opacity: isDark ? 1 : 0,
            rotate: isDark ? 0 : -180,
          }}
          transition={{ duration: 0.3 }}
        >
          <Moon className="h-3 w-3 text-blue-400" />
        </motion.div>
      </motion.div>
    </motion.button>
  )
}

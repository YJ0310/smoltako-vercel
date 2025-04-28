"use client"

import { useState, useEffect } from "react"
import { Dock, DockItem } from "@/components/ui/dock"
import { Home, Layers, Moon, Sun, Palette, User, Sparkles } from "lucide-react"
import { useTheme } from "next-themes"

export function DockNav() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  if (!mounted) return null

  return (
    <Dock position="bottom" className="z-50">
      <DockItem onClick={() => scrollToSection("home")} tooltip="Home">
        <Home className="h-6 w-6 text-primary" />
      </DockItem>
      <DockItem onClick={() => scrollToSection("about")} tooltip="About">
        <User className="h-6 w-6 text-primary" />
      </DockItem>
      <DockItem onClick={() => scrollToSection("platforms")} tooltip="Platforms">
        <Layers className="h-6 w-6 text-primary" />
      </DockItem>
      <DockItem onClick={() => scrollToSection("illustrations")} tooltip="Illustrations">
        <Palette className="h-6 w-6 text-primary" />
      </DockItem>
      <DockItem onClick={() => scrollToSection("ai-tools")} tooltip="AI Tools">
        <Sparkles className="h-6 w-6 text-primary" />
      </DockItem>
      <DockItem
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        tooltip={theme === "dark" ? "Light Mode" : "Dark Mode"}
      >
        {theme === "dark" ? <Sun className="h-6 w-6 text-primary" /> : <Moon className="h-6 w-6 text-primary" />}
      </DockItem>
    </Dock>
  )
}
